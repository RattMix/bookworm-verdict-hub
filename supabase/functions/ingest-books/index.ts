
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

    console.log('Starting aggressive book ingestion for 2025...');

    // Popular genres to search for
    const popularGenres = [
      'fiction',
      'romance', 
      'fantasy',
      'mystery',
      'thriller',
      'biography',
      'historical_fiction',
      'literary_fiction',
      'science_fiction',
      'contemporary_fiction'
    ];

    const allBooks: OpenLibraryBook[] = [];
    let successfullyAdded = 0;
    const targetBookCount = 25;

    // First attempt: Search for 2025 books by genre
    for (const genre of popularGenres) {
      if (allBooks.length >= 100) break; // Collect enough to filter from
      
      console.log(`Searching for ${genre} books from 2025...`);
      
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?subject=${genre}&publish_year=2025&language=eng&sort=new&limit=25`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.docs && data.docs.length > 0) {
            console.log(`Found ${data.docs.length} ${genre} books from 2025`);
            allBooks.push(...data.docs);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${genre} books:`, error);
      }

      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Second attempt: If we don't have enough, try recent years
    if (allBooks.length < 50) {
      console.log('Not enough 2025 books, searching 2024...');
      
      for (const genre of popularGenres.slice(0, 5)) {
        if (allBooks.length >= 100) break;
        
        try {
          const response = await fetch(
            `https://openlibrary.org/search.json?subject=${genre}&publish_year=2024&language=eng&sort=new&limit=20`
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.docs && data.docs.length > 0) {
              console.log(`Found ${data.docs.length} ${genre} books from 2024`);
              allBooks.push(...data.docs);
            }
          }
        } catch (error) {
          console.error(`Error fetching 2024 ${genre} books:`, error);
        }

        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    // Third attempt: Broad search if still not enough
    if (allBooks.length < 30) {
      console.log('Still need more books, doing broad search...');
      
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=fiction&publish_year=2025&language=eng&limit=50`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.docs && data.docs.length > 0) {
            console.log(`Found ${data.docs.length} books from broad search`);
            allBooks.push(...data.docs);
          }
        }
      } catch (error) {
        console.error('Error in broad search:', error);
      }
    }

    console.log(`Total books collected: ${allBooks.length}`);

    // Process and add books
    const seenIsbns = new Set<string>();
    const seenTitles = new Set<string>();
    
    for (const book of allBooks) {
      if (successfullyAdded >= targetBookCount) break;

      // Must have title and author
      if (!book.title || !book.author_name?.[0]) {
        continue;
      }

      const title = book.title.trim();
      const author = book.author_name[0].trim();

      // Skip if too short
      if (title.length < 3 || author.length < 2) {
        continue;
      }

      // Deduplicate by title+author combo
      const titleAuthorKey = `${title.toLowerCase()}_${author.toLowerCase()}`;
      if (seenTitles.has(titleAuthorKey)) {
        continue;
      }
      seenTitles.add(titleAuthorKey);

      // Get ISBN
      let isbn = '';
      if (book.isbn && book.isbn.length > 0) {
        const validIsbn = book.isbn.find(i => i && (i.length === 13 || i.length === 10));
        if (validIsbn) {
          isbn = validIsbn;
          if (seenIsbns.has(isbn)) {
            continue;
          }
          seenIsbns.add(isbn);
        }
      }

      // Check if book already exists
      const { data: existingBook } = await supabase
        .from('books')
        .select('id')
        .or(`title.eq.${title},isbn.eq.${isbn}`)
        .maybeSingle();

      if (existingBook) {
        console.log(`Book already exists: ${title}`);
        continue;
      }

      // Determine publication year
      let publishYear = 2025;
      if (book.first_publish_year && book.first_publish_year >= 2020) {
        publishYear = book.first_publish_year;
      } else if (book.publish_year && book.publish_year.length > 0) {
        const recentYear = book.publish_year.find(y => y >= 2020 && y <= 2025);
        if (recentYear) publishYear = recentYear;
      }

      // Map subjects to genres
      const genres = mapSubjectsToGenres(book.subject || [], title);
      
      // Generate cover URL
      let coverUrl = '';
      if (isbn) {
        coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      }

      // Generate summary
      const summary = generateSummary(title, author, genres);

      const bookData = {
        title,
        author,
        published_date: `${publishYear}-01-01`,
        genre: genres.length > 0 ? genres : ['Fiction'],
        page_count: book.number_of_pages_median || Math.floor(Math.random() * 200) + 200,
        isbn: isbn || null,
        cover_url: coverUrl || null,
        summary,
        critic_score: null,
        critic_quotes: [{
          quote: "Critic reviews for this book are coming soon.",
          source: "Plot Twist",
          reviewer: "Editorial Team"
        }]
      };

      console.log(`Attempting to insert: "${title}" by ${author} (${publishYear})`);

      const { error } = await supabase
        .from('books')
        .insert(bookData);

      if (error) {
        console.error(`Error inserting book "${title}":`, error);
      } else {
        successfullyAdded++;
        console.log(`✓ Successfully added: "${title}" by ${author} (${successfullyAdded}/${targetBookCount})`);
      }

      // Small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`Successfully processed ${successfullyAdded} books`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: successfullyAdded,
        total_found: allBooks.length,
        message: `Successfully added ${successfullyAdded} books to the database`
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

function mapSubjectsToGenres(subjects: string[], title: string): string[] {
  const genreMapping: { [key: string]: string[] } = {
    'Fantasy': ['fantasy', 'magic', 'dragons', 'wizards', 'supernatural', 'epic fantasy'],
    'Romance': ['romance', 'love', 'relationships', 'romantic', 'love story'],
    'Historical Fiction': ['historical', 'history', 'period', 'historical fiction', 'civil war', 'world war'],
    'Thriller': ['thriller', 'suspense', 'mystery', 'crime', 'detective', 'psychological thriller'],
    'Literary Fiction': ['literary', 'contemporary', 'literature', 'literary fiction', 'drama'],
    'Memoir': ['memoir', 'autobiography', 'biography', 'personal narrative', 'life story'],
    'Science Fiction': ['science fiction', 'sci-fi', 'space', 'future', 'dystopian'],
    'Mystery': ['mystery', 'detective', 'murder', 'investigation', 'police']
  };

  const matchedGenres: string[] = [];
  const titleLower = title.toLowerCase();
  
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

  // Fallback: infer genre from title
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

function generateSummary(title: string, author: string, genres: string[]): string {
  const genreText = genres.length > 0 ? genres[0] : 'Fiction';
  
  const summaryTemplates = [
    `A compelling ${genreText.toLowerCase()} work by ${author}. This recent release explores contemporary themes with engaging storytelling.`,
    `${author}'s latest ${genreText.toLowerCase()} offering delivers an immersive reading experience with rich character development.`,
    `In this ${genreText.toLowerCase()} novel, ${author} crafts a narrative that captivates readers from beginning to end.`,
    `A thought-provoking ${genreText.toLowerCase()} book by ${author} that promises to be a standout addition to 2025's literary landscape.`
  ];
  
  return summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
}
