
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OpenLibraryBook {
  title: string;
  author_name?: string[];
  publish_year?: number[];
  isbn?: string[];
  subject?: string[];
  number_of_pages_median?: number;
  first_publish_year?: number;
  key?: string;
}

interface CriticQuote {
  quote: string;
  source: string;
  reviewer?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting 2025 book ingestion from Open Library...');

    // Target genres for 2025 books
    const targetSubjects = [
      'fantasy',
      'romance', 
      'historical_fiction',
      'thriller',
      'suspense',
      'literary_fiction',
      'memoir',
      'biography',
      'science_fiction',
      'mystery'
    ];

    const allBooks: OpenLibraryBook[] = [];

    // Search for books published in 2025 across target subjects
    for (const subject of targetSubjects) {
      console.log(`Searching for ${subject} books from 2025...`);
      
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?subject=${subject}&publish_year=2025&language=eng&sort=new&limit=15&has_fulltext=false`
        );
        
        if (!response.ok) {
          console.log(`Failed to fetch ${subject} books: ${response.status}`);
          continue;
        }
        
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
          console.log(`Found ${data.docs.length} ${subject} books`);
          allBooks.push(...data.docs);
        }
      } catch (error) {
        console.error(`Error fetching ${subject} books:`, error);
      }

      // Small delay to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(`Total books found: ${allBooks.length}`);

    let processedCount = 0;
    const maxBooksPerBatch = 100;

    for (const book of allBooks) {
      if (processedCount >= maxBooksPerBatch) break;

      // Skip books without required fields
      if (!book.title || !book.author_name || !book.isbn || !book.author_name[0]) {
        continue;
      }

      // Ensure it's actually from 2025
      if (!book.first_publish_year || book.first_publish_year !== 2025) {
        continue;
      }

      const isbn = book.isbn[0];
      const title = book.title;
      const author = book.author_name[0];

      // Check if book already exists
      const { data: existingBook } = await supabase
        .from('books')
        .select('id')
        .eq('isbn', isbn)
        .single();

      if (existingBook) {
        console.log(`Book already exists: ${title}`);
        continue; // Skip duplicates
      }

      // Map subjects to our genre categories
      const genres = mapSubjectsToGenres(book.subject || []);
      
      // Generate cover URL
      const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

      // Create summary from subjects
      const summary = generateSummary(title, author, genres, book.subject);

      // Placeholder critic quotes
      const criticQuotes = [{
        quote: "Critic reviews for this book are coming soon.",
        source: "Plot Twist",
        reviewer: "Editorial Team"
      }];

      const bookData = {
        title,
        author,
        published_date: '2025-01-01',
        genre: genres.length > 0 ? genres : ['Fiction'],
        page_count: book.number_of_pages_median || null,
        isbn,
        cover_url: coverUrl,
        summary,
        critic_score: null,
        critic_quotes: criticQuotes
      };

      console.log(`Attempting to insert: ${title} by ${author}`);

      const { error } = await supabase
        .from('books')
        .insert(bookData);

      if (error) {
        console.error(`Error inserting book "${title}":`, error);
      } else {
        processedCount++;
        console.log(`✓ Added: ${title} by ${author}`);
      }
    }

    console.log(`Successfully processed ${processedCount} new 2025 books`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: processedCount,
        total_found: allBooks.length,
        message: `Added ${processedCount} new 2025 books to the database`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ingest-books function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function mapSubjectsToGenres(subjects: string[]): string[] {
  const genreMapping: { [key: string]: string[] } = {
    'Fantasy': ['fantasy', 'magic', 'dragons', 'wizards', 'supernatural'],
    'Romance': ['romance', 'love', 'relationships', 'romantic'],
    'Historical Fiction': ['historical', 'history', 'period', 'historical fiction'],
    'Thriller': ['thriller', 'suspense', 'mystery', 'crime', 'detective'],
    'Literary Fiction': ['literary', 'contemporary', 'literature', 'literary fiction'],
    'Memoir': ['memoir', 'autobiography', 'biography', 'personal narrative'],
    'Science Fiction': ['science fiction', 'sci-fi', 'space', 'future'],
    'Mystery': ['mystery', 'detective', 'murder', 'investigation']
  };

  const matchedGenres: string[] = [];
  
  for (const [genre, keywords] of Object.entries(genreMapping)) {
    for (const subject of subjects) {
      const subjectLower = subject.toLowerCase();
      if (keywords.some(keyword => subjectLower.includes(keyword))) {
        if (!matchedGenres.includes(genre)) {
          matchedGenres.push(genre);
        }
      }
    }
  }

  return matchedGenres;
}

function generateSummary(title: string, author: string, genres: string[], subjects?: string[]): string {
  const genreText = genres.length > 0 ? genres[0] : 'Fiction';
  const subjectHints = subjects ? subjects.slice(0, 2).join(', ') : '';
  
  let summary = `A compelling ${genreText.toLowerCase()} work by ${author}.`;
  
  if (subjectHints) {
    summary += ` Exploring themes of ${subjectHints.toLowerCase()}.`;
  }
  
  summary += ' This 2025 release promises to be an engaging addition to contemporary literature.';
  
  return summary;
}
