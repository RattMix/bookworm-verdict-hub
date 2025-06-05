
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Starting book ingestion for 2025 books...')

    // Popular 2025 books with their actual ISBNs for testing
    const targetBooks = [
      { title: "Iron Flame", author: "Rebecca Yarros", isbn: "9781649374172", genre: ["Fantasy", "Romance"] },
      { title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", isbn: "9780593321201", genre: ["Literary Fiction"] },
      { title: "The Seven Moons of Maali Almeida", author: "Shehan Karunatilaka", isbn: "9781250832535", genre: ["Literary Fiction", "Fantasy"] },
      { title: "Book Lovers", author: "Emily Henry", isbn: "9780593334836", genre: ["Romance", "Contemporary"] },
      { title: "The Atlas Six", author: "Olivie Blake", isbn: "9781250854926", genre: ["Fantasy", "Dark Academia"] },
      { title: "Babel", author: "R.F. Kuang", isbn: "9780063021426", genre: ["Fantasy", "Historical Fiction"] },
      { title: "The School for Good Mothers", author: "Jessamine Chan", isbn: "9781982156718", genre: ["Literary Fiction", "Dystopian"] },
      { title: "The Midnight Library", author: "Matt Haig", isbn: "9780525559474", genre: ["Literary Fiction", "Philosophy"] },
      { title: "Klara and the Sun", author: "Kazuo Ishiguro", isbn: "9780593318171", genre: ["Literary Fiction", "Science Fiction"] },
      { title: "The Invisible Life of Addie LaRue", author: "V.E. Schwab", isbn: "9780765387561", genre: ["Fantasy", "Romance"] },
      { title: "Mexican Gothic", author: "Silvia Moreno-Garcia", isbn: "9780525620785", genre: ["Horror", "Gothic"] },
      { title: "The House in the Cerulean Sea", author: "TJ Klune", isbn: "9781250217318", genre: ["Fantasy", "LGBTQ+"] },
      { title: "Beach Read", author: "Emily Henry", isbn: "9781984806734", genre: ["Romance", "Contemporary"] },
      { title: "The Song of Achilles", author: "Madeline Miller", isbn: "9780062060624", genre: ["Historical Fiction", "LGBTQ+"] },
      { title: "Circe", author: "Madeline Miller", isbn: "9780316556347", genre: ["Historical Fiction", "Mythology"] },
      { title: "The Silent Patient", author: "Alex Michaelides", isbn: "9781250301697", genre: ["Thriller", "Mystery"] },
      { title: "Where the Crawdads Sing", author: "Delia Owens", isbn: "9780735219090", genre: ["Literary Fiction", "Mystery"] },
      { title: "Normal People", author: "Sally Rooney", isbn: "9781984822178", genre: ["Literary Fiction", "Romance"] },
      { title: "The Vanishing Half", author: "Brit Bennett", isbn: "9780525536291", genre: ["Literary Fiction", "Historical Fiction"] },
      { title: "Such a Fun Age", author: "Kiley Reid", isbn: "9780525541905", genre: ["Literary Fiction", "Contemporary"] },
      { title: "The Water Dancer", author: "Ta-Nehisi Coates", isbn: "9780399590597", genre: ["Historical Fiction", "Literary Fiction"] },
      { title: "Red, White & Royal Blue", author: "Casey McQuiston", isbn: "9781250316776", genre: ["Romance", "LGBTQ+"] },
      { title: "The Priory of the Orange Tree", author: "Samantha Shannon", isbn: "9781635570304", genre: ["Fantasy", "Epic Fantasy"] },
      { title: "The Poppy War", author: "R.F. Kuang", isbn: "9780062662569", genre: ["Fantasy", "Military Fantasy"] },
      { title: "Educated", author: "Tara Westover", isbn: "9780399590504", genre: ["Memoir", "Biography"] }
    ]

    console.log(`Preparing to ingest ${targetBooks.length} books with ISBNs...`)

    let booksAdded = 0

    for (const book of targetBooks) {
      try {
        // Check if book already exists
        const { data: existingBook } = await supabaseClient
          .from('books')
          .select('id')
          .eq('isbn', book.isbn)
          .single()

        if (existingBook) {
          console.log(`Book already exists: ${book.title}`)
          continue
        }

        // Create mock data for the book
        const bookData = {
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          genre: book.genre,
          published_date: '2025-01-01',
          page_count: Math.floor(Math.random() * 400) + 200,
          summary: `${book.title} by ${book.author} is a compelling ${book.genre[0].toLowerCase()} novel that has captured readers' attention with its unique storytelling and memorable characters.`,
          critic_score: Math.floor(Math.random() * 40) + 60, // Score between 60-100
          critic_quotes: [
            {
              quote: `A remarkable achievement in ${book.genre[0].toLowerCase()} literature that showcases ${book.author}'s exceptional storytelling abilities.`,
              source: "The Literary Review",
              reviewer: "Editorial Team"
            }
          ]
        }

        console.log(`Adding book: ${book.title} with ISBN: ${book.isbn}`)

        const { error: insertError } = await supabaseClient
          .from('books')
          .insert(bookData)

        if (insertError) {
          console.error(`Error inserting ${book.title}:`, insertError)
        } else {
          booksAdded++
          console.log(`Successfully added: ${book.title}`)
        }

        // Small delay to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 100))

      } catch (error) {
        console.error(`Error processing ${book.title}:`, error)
      }
    }

    console.log(`Ingestion complete. Added ${booksAdded} new books.`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully added ${booksAdded} books with ISBNs`,
        booksAdded 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Book ingestion error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
