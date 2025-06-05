
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

    console.log('Starting daily book ingestion...');

    // Fetch books from Open Library - search for recent fiction and popular books
    const subjects = ['fiction', 'bestseller', 'award_winner', 'literary_fiction'];
    const allBooks: OpenLibraryBook[] = [];

    for (const subject of subjects) {
      const response = await fetch(
        `https://openlibrary.org/search.json?subject=${subject}&sort=new&limit=25&language=eng&has_fulltext=false`
      );
      
      if (!response.ok) continue;
      
      const data = await response.json();
      allBooks.push(...(data.docs || []));
    }

    console.log(`Found ${allBooks.length} potential books from Open Library`);

    let processedCount = 0;
    const maxBooksPerDay = 100;

    for (const book of allBooks) {
      if (processedCount >= maxBooksPerDay) break;

      // Skip books without required fields
      if (!book.title || !book.author_name || !book.isbn) continue;

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

      // Extract genres from subjects
      const genres = book.subject?.slice(0, 3) || ['Fiction'];
      
      // Generate cover URL
      const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

      // Generate a basic critic score (would be replaced with real data)
      const criticScore = Math.floor(Math.random() * 40) + 60; // 60-100 range

      // Try to find real critic quotes (placeholder for now)
      const criticQuotes = await findCriticQuotes(title, author);

      const bookData = {
        title,
        author,
        published_date: book.first_publish_year ? `${book.first_publish_year}-01-01` : null,
        genre: genres,
        page_count: book.number_of_pages_median || null,
        isbn,
        cover_url: coverUrl,
        summary: `A compelling work by ${author}. Critic reviews for this book are coming soon.`,
        critic_score: criticScore,
        critic_quotes: criticQuotes
      };

      const { error } = await supabase
        .from('books')
        .insert(bookData);

      if (!error) {
        processedCount++;
        console.log(`Added book: ${title} by ${author}`);
      }
    }

    console.log(`Successfully processed ${processedCount} new books`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: processedCount,
        message: `Added ${processedCount} new books to the database`
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

async function findCriticQuotes(title: string, author: string): Promise<CriticQuote[]> {
  // Placeholder for real critic quote integration
  // In a real implementation, this would search BookMarks, Goodreads API, etc.
  
  // For now, return empty array - real quotes would be added manually or through APIs
  return [];
}
