
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
  language?: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting enhanced 2025 book ingestion from Open Library...');

    // Broader subject searches to increase success rate
    const targetSubjects = [
      'fiction',
      'romance', 
      'fantasy',
      'biography',
      'thriller',
      'historical',
      'literary',
      'mystery',
      'science_fiction',
      'contemporary'
    ];

    const allBooks: OpenLibraryBook[] = [];
    let processedCount = 0;
    const targetBookCount = 25; // Aim for at least 25 books

    // Primary search for 2025 books
    for (const subject of targetSubjects) {
      if (processedCount >= targetBookCount) break;
      
      console.log(`Searching for ${subject} books from 2025...`);
      
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?subject=${subject}&publish_year=2025&language=eng&sort=new&limit=20&has_fulltext=false`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.docs && data.docs.length > 0) {
            console.log(`Found ${data.docs.length} ${subject} books from 2025`);
            allBooks.push(...data.docs);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${subject} books:`, error);
      }

      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Fallback: search for recent books if 2025 yields too few results
    if (allBooks.length < 50) {
      console.log('Insufficient 2025 books found, searching 2024 as fallback...');
      
      const fallbackSubjects = ['fiction', 'romance', 'fantasy', 'biography', 'thriller'];
      for (const subject of fallbackSubjects) {
        if (allBooks.length >= 100) break;
        
        try {
          const response = await fetch(
            `https://openlibrary.org/search.json?subject=${subject}&publish_year=2024&language=eng&sort=new&limit=15&has_fulltext=false`
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.docs && data.docs.length > 0) {
              console.log(`Found ${data.docs.length} ${subject} books from 2024`);
              allBooks.push(...data.docs);
            }
          }
        } catch (error) {
          console.error(`Error fetching fallback ${subject} books:`, error);
        }

        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    console.log(`Total books collected: ${allBooks.length}`);

    // Process books with more lenient filtering
    const seenIsbns = new Set<string>();
    
    for (const book of allBooks) {
      if (processedCount >= targetBookCount) break;

      // Basic required fields check - be more lenient
      if (!book.title || !book.author_name?.[0]) {
        continue;
      }

      const title = book.title.trim();
      const author = book.author_name[0].trim();

      // Skip if title or author is too short or generic
      if (title.length < 2 || author.length < 2) {
        continue;
      }

      // Get ISBN - try multiple sources
      let isbn = '';
      if (book.isbn && book.isbn.length > 0) {
        // Find a valid ISBN (prefer 13-digit, then 10-digit)
        const validIsbn = book.isbn.find(i => i && (i.length === 13 || i.length === 10));
        if (validIsbn) {
          isbn = validIsbn;
        }
      }

      // If no ISBN, generate a unique identifier for deduplication
      const bookId = isbn || `${title}_${author}`.toLowerCase().replace(/\s+/g, '_');
      
      if (seenIsbns.has(bookId)) {
        console.log(`Duplicate book skipped: ${title}`);
        continue;
      }
      seenIsbns.add(bookId);

      // Check if book already exists in database
      const { data: existingBook } = await supabase
        .from('books')
        .select('id')
        .or(`isbn.eq.${isbn},title.eq.${title}`)
        .single();

      if (existingBook) {
        console.log(`Book already exists in database: ${title}`);
        continue;
      }

      // Determine publication year
      let publishYear = 2025;
      if (book.first_publish_year && book.first_publish_year >= 2020) {
        publishYear = book.first_publish_year;
      } else if (book.publish_year && book.publish_year.length > 0) {
        const recentYear = book.publish_year.find(y => y >= 2020);
        if (recentYear) publishYear = recentYear;
      }

      // Map subjects to genres with broader mapping
      const genres = mapSubjectsToGenres(book.subject || [], title, author);
      
      // Generate cover URL - use title/author if no ISBN
      let coverUrl = '';
      if (isbn) {
        coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      } else {
        // Try alternative cover sources
        const titleQuery = encodeURIComponent(title.substring(0, 50));
        coverUrl = `https://covers.openlibrary.org/b/title/${titleQuery}-L.jpg`;
      }

      // Create a meaningful summary
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
        published_date: `${publishYear}-01-01`,
        genre: genres.length > 0 ? genres : ['Fiction'],
        page_count: book.number_of_pages_median || null,
        isbn: isbn || null,
        cover_url: coverUrl,
        summary,
        critic_score: null,
        critic_quotes: criticQuotes
      };

      console.log(`Attempting to insert: "${title}" by ${author} (${publishYear})`);

      const { error } = await supabase
        .from('books')
        .insert(bookData);

      if (error) {
        console.error(`Error inserting book "${title}":`, error);
      } else {
        processedCount++;
        console.log(`✓ Successfully added: "${title}" by ${author}`);
      }
    }

    console.log(`Successfully processed ${processedCount} books`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: processedCount,
        total_found: allBooks.length,
        message: `Successfully added ${processedCount} books to the database`
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

function mapSubjectsToGenres(subjects: string[], title: string, author: string): string[] {
  const genreMapping: { [key: string]: string[] } = {
    'Fantasy': ['fantasy', 'magic', 'dragons', 'wizards', 'supernatural', 'epic fantasy'],
    'Romance': ['romance', 'love', 'relationships', 'romantic', 'love story'],
    'Historical Fiction': ['historical', 'history', 'period', 'historical fiction', 'civil war', 'world war'],
    'Thriller': ['thriller', 'suspense', 'mystery', 'crime', 'detective', 'psychological thriller'],
    'Literary Fiction': ['literary', 'contemporary', 'literature', 'literary fiction', 'drama'],
    'Memoir': ['memoir', 'autobiography', 'biography', 'personal narrative', 'life story'],
    'Science Fiction': ['science fiction', 'sci-fi', 'space', 'future', 'dystopian'],
    'Mystery': ['mystery', 'detective', 'murder', 'investigation', 'police'],
    'Contemporary Fiction': ['contemporary', 'modern', 'current', 'present day']
  };

  const matchedGenres: string[] = [];
  const titleLower = title.toLowerCase();
  const authorLower = author.toLowerCase();
  
  // Check subjects against genre mapping
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

  // Fallback: infer genre from title if no subjects matched
  if (matchedGenres.length === 0) {
    for (const [genre, keywords] of Object.entries(genreMapping)) {
      if (keywords.some(keyword => titleLower.includes(keyword))) {
        matchedGenres.push(genre);
        break;
      }
    }
  }

  return matchedGenres.length > 0 ? matchedGenres : ['Fiction'];
}

function generateSummary(title: string, author: string, genres: string[], subjects?: string[]): string {
  const genreText = genres.length > 0 ? genres[0] : 'Fiction';
  const subjectHints = subjects ? subjects.slice(0, 2).join(', ') : '';
  
  let summary = `A compelling ${genreText.toLowerCase()} work by ${author}.`;
  
  if (subjectHints) {
    summary += ` Exploring themes of ${subjectHints.toLowerCase()}.`;
  }
  
  summary += ' This recent release promises to be an engaging addition to contemporary literature.';
  
  return summary;
}
