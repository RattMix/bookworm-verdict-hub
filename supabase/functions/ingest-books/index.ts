
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

    console.log('Starting 2025 book ingestion...');

    // Target genres for 2025 books
    const targetGenres = [
      'fantasy',
      'romance', 
      'historical_fiction',
      'thriller',
      'suspense',
      'literary_fiction',
      'memoir',
      'biography'
    ];

    const allBooks: OpenLibraryBook[] = [];

    // Search for books published in 2025 across target genres
    for (const genre of targetGenres) {
      console.log(`Searching for ${genre} books from 2025...`);
      
      const response = await fetch(
        `https://openlibrary.org/search.json?subject=${genre}&publish_year=2025&language=eng&sort=new&limit=20&has_fulltext=false`
      );
      
      if (!response.ok) {
        console.log(`Failed to fetch ${genre} books`);
        continue;
      }
      
      const data = await response.json();
      if (data.docs) {
        allBooks.push(...data.docs);
      }
    }

    console.log(`Found ${allBooks.length} potential 2025 books from Open Library`);

    let processedCount = 0;
    const maxBooksPerDay = 100;

    for (const book of allBooks) {
      if (processedCount >= maxBooksPerDay) break;

      // Skip books without required fields or not from 2025
      if (!book.title || !book.author_name || !book.isbn) continue;
      if (!book.first_publish_year || book.first_publish_year !== 2025) continue;

      const isbn = book.isbn[0];
      const title = book.title;
      const author = book.author_name[0];

      // Check if book already exists
      const { data: existingBook } = await supabase
        .from('books')
        .select('id')
        .eq('isbn', isbn)
        .single();

      if (existingBook) continue; // Skip duplicates

      // Map subjects to our genre categories
      const genres = mapSubjectsToGenres(book.subject || []);
      
      // Generate cover URL
      const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

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
        summary: generateSummary(title, author, genres),
        critic_score: null, // No fake scores
        critic_quotes: criticQuotes
      };

      const { error } = await supabase
        .from('books')
        .insert(bookData);

      if (!error) {
        processedCount++;
        console.log(`Added 2025 book: ${title} by ${author}`);
      }
    }

    console.log(`Successfully processed ${processedCount} new 2025 books`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: processedCount,
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
    'Fantasy': ['fantasy', 'magic', 'dragons', 'wizards'],
    'Romance': ['romance', 'love', 'relationships'],
    'Historical Fiction': ['historical', 'history', 'period'],
    'Thriller': ['thriller', 'suspense', 'mystery', 'crime'],
    'Literary Fiction': ['literary', 'contemporary', 'literature'],
    'Memoir': ['memoir', 'autobiography', 'biography', 'personal narrative']
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

function generateSummary(title: string, author: string, genres: string[]): string {
  const genreText = genres.length > 0 ? genres.join(', ') : 'Fiction';
  return `A compelling ${genreText.toLowerCase()} work by ${author}. This 2025 release promises to be an engaging addition to contemporary literature. Critic reviews and detailed analysis are coming soon.`;
}
