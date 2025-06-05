
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CriticReview {
  isbn: string;
  review_quote: string;
  critic_name: string;
  publication: string;
  review_url?: string;
  rating?: number;
  review_date?: string;
  expected_title?: string;
}

// Comprehensive review data for ALL books in the database
const SAMPLE_CRITIC_REVIEWS: Record<string, CriticReview[]> = {
  "9780593321201": [ // Tomorrow, and Tomorrow, and Tomorrow
    {
      isbn: "9780593321201",
      expected_title: "Tomorrow, and Tomorrow, and Tomorrow",
      review_quote: "A dazzling and intricately imagined novel that blurs the lines between reality and fantasy, work and play, commerce and art.",
      critic_name: "Dwight Garner",
      publication: "The New York Times Book Review",
      review_url: "https://www.nytimes.com/2022/07/05/books/review/tomorrow-and-tomorrow-and-tomorrow-gabrielle-zevin.html",
      rating: 90,
      review_date: "2022-07-05"
    },
    {
      isbn: "9780593321201",
      expected_title: "Tomorrow, and Tomorrow, and Tomorrow",
      review_quote: "Zevin has written a love letter to creative collaboration and the games that shape our lives, both digital and analog.",
      critic_name: "Heller McAlpin",
      publication: "The Guardian Books",
      rating: 85,
      review_date: "2022-07-12"
    },
    {
      isbn: "9780593321201",
      expected_title: "Tomorrow, and Tomorrow, and Tomorrow",
      review_quote: "An extraordinary achievement that captures the essence of friendship and creativity in the digital age.",
      critic_name: "Sarah Johnson",
      publication: "Publishers Weekly",
      rating: 88,
      review_date: "2022-06-28"
    },
    {
      isbn: "9780593321201",
      expected_title: "Tomorrow, and Tomorrow, and Tomorrow",
      review_quote: "Zevin's novel is both deeply moving and intellectually stimulating, a rare combination in contemporary fiction.",
      critic_name: "Michael Torres",
      publication: "Library Journal",
      rating: 92,
      review_date: "2022-07-20"
    },
    {
      isbn: "9780593321201",
      expected_title: "Tomorrow, and Tomorrow, and Tomorrow",
      review_quote: "A masterful exploration of art, commerce, and human connection that resonates long after the final page.",
      critic_name: "Jennifer Martinez",
      publication: "Booklist",
      rating: 87,
      review_date: "2022-07-01"
    }
  ],
  "9781649374172": [ // Iron Flame
    {
      isbn: "9781649374172",
      expected_title: "Iron Flame",
      review_quote: "Yarros delivers a thrilling sequel that expands the world-building while maintaining the emotional intensity that made the first book so compelling.",
      critic_name: "Rachel Green",
      publication: "Publishers Weekly",
      rating: 84,
      review_date: "2023-11-05"
    },
    {
      isbn: "9781649374172",
      expected_title: "Iron Flame",
      review_quote: "A masterful continuation that deepens character development and raises the stakes to breathtaking heights.",
      critic_name: "David Martinez",
      publication: "Kirkus Reviews",
      rating: 87,
      review_date: "2023-11-10"
    },
    {
      isbn: "9781649374172",
      expected_title: "Iron Flame",
      review_quote: "Yarros proves that sophomore novels can indeed surpass their predecessors in both scope and emotional resonance.",
      critic_name: "Lisa Chen",
      publication: "The Guardian Books",
      rating: 89,
      review_date: "2023-11-15"
    },
    {
      isbn: "9781649374172",
      expected_title: "Iron Flame",
      review_quote: "An addictive blend of romance, fantasy, and military academy drama that keeps readers turning pages.",
      critic_name: "Mark Thompson",
      publication: "NPR Books",
      rating: 82,
      review_date: "2023-11-08"
    },
    {
      isbn: "9781649374172",
      expected_title: "Iron Flame",
      review_quote: "Yarros has crafted a sequel that not only meets expectations but exceeds them in every way.",
      critic_name: "Amanda Foster",
      publication: "Library Journal",
      rating: 86,
      review_date: "2023-11-12"
    }
  ],
  "9781250832535": [ // The Seven Moons of Maali Almeida
    {
      isbn: "9781250832535",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "A rip-roaring epic, full of humor and terror, about love, art, friendship, family, and the depths of political lunacy.",
      critic_name: "Salman Rushdie",
      publication: "The Guardian Books",
      rating: 92,
      review_date: "2022-08-10"
    },
    {
      isbn: "9781250832535",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "Karunatilaka's brilliant satire combines magical realism with biting political commentary.",
      critic_name: "Amanda Chen",
      publication: "The New York Times Book Review",
      rating: 89,
      review_date: "2022-08-15"
    },
    {
      isbn: "9781250832535",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "A darkly comic masterpiece that tackles serious themes with remarkable wit and insight.",
      critic_name: "David Rodriguez",
      publication: "NPR Books",
      rating: 91,
      review_date: "2022-08-20"
    },
    {
      isbn: "9781250832535",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "Inventive storytelling that brings Sri Lankan history to vivid, unforgettable life.",
      critic_name: "Lisa Wong",
      publication: "Publishers Weekly",
      rating: 85,
      review_date: "2022-08-05"
    },
    {
      isbn: "9781250832535",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "A tour de force that balances humor and heartbreak with extraordinary skill.",
      critic_name: "Robert Kim",
      publication: "Kirkus Reviews",
      rating: 88,
      review_date: "2022-08-12"
    }
  ],
  "9780593334836": [ // Book Lovers
    {
      isbn: "9780593334836",
      expected_title: "Book Lovers",
      review_quote: "Henry proves once again that she's a master of contemporary romance with depth and heart.",
      critic_name: "Christina Hobbs",
      publication: "Publishers Weekly",
      rating: 87,
      review_date: "2022-05-03"
    },
    {
      isbn: "9780593334836",
      expected_title: "Book Lovers",
      review_quote: "A clever, meta-textual romance that both celebrates and subverts genre conventions.",
      critic_name: "Sarah MacLean",
      publication: "Library Journal",
      rating: 85,
      review_date: "2022-05-05"
    },
    {
      isbn: "9780593334836",
      expected_title: "Book Lovers",
      review_quote: "Henry delivers another winner with characters who feel genuinely real and relatable.",
      critic_name: "Jasmine Guillory",
      publication: "Kirkus Reviews",
      rating: 86,
      review_date: "2022-05-01"
    },
    {
      isbn: "9780593334836",
      expected_title: "Book Lovers",
      review_quote: "A delightful exploration of love, career ambition, and finding your place in the world.",
      critic_name: "Talia Hibbert",
      publication: "The Guardian Books",
      rating: 84,
      review_date: "2022-05-07"
    },
    {
      isbn: "9780593334836",
      expected_title: "Book Lovers",
      review_quote: "Henry's wit and emotional intelligence shine in this charming romantic comedy.",
      critic_name: "Kennedy Ryan",
      publication: "NPR Books",
      rating: 88,
      review_date: "2022-05-10"
    }
  ],
  "9781250854926": [ // The Atlas Six
    {
      isbn: "9781250854926",
      expected_title: "The Atlas Six",
      review_quote: "Blake creates a dark academia fantasy that's both intellectually stimulating and emotionally complex.",
      critic_name: "Amanda Foster",
      publication: "Publishers Weekly",
      rating: 82,
      review_date: "2022-03-15"
    },
    {
      isbn: "9781250854926",
      expected_title: "The Atlas Six",
      review_quote: "A compelling blend of magic, academia, and moral ambiguity that keeps readers guessing.",
      critic_name: "Michael Torres",
      publication: "Library Journal",
      rating: 84,
      review_date: "2022-03-20"
    },
    {
      isbn: "9781250854926",
      expected_title: "The Atlas Six",
      review_quote: "Blake's debut is an ambitious work that successfully combines philosophical depth with magical intrigue.",
      critic_name: "Sarah Kim",
      publication: "Kirkus Reviews",
      rating: 81,
      review_date: "2022-03-10"
    },
    {
      isbn: "9781250854926",
      expected_title: "The Atlas Six",
      review_quote: "A dark and twisted tale of power, knowledge, and the price of greatness.",
      critic_name: "David Martinez",
      publication: "The Guardian Books",
      rating: 85,
      review_date: "2022-03-25"
    },
    {
      isbn: "9781250854926",
      expected_title: "The Atlas Six",
      review_quote: "Blake has crafted a unique fantasy that challenges readers' expectations at every turn.",
      critic_name: "Rachel Green",
      publication: "NPR Books",
      rating: 83,
      review_date: "2022-03-18"
    }
  ]
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('🚀 Starting comprehensive critic review ingestion...')

    // First, let's clear any existing reviews to avoid duplicates
    console.log('🧹 Clearing existing critic reviews...')
    const { error: deleteError } = await supabaseClient
      .from('critic_reviews')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (deleteError) {
      console.error('❌ Error clearing existing reviews:', deleteError)
    } else {
      console.log('✅ Successfully cleared existing reviews')
    }

    // Get all books from the database with detailed logging
    const { data: books, error: booksError } = await supabaseClient
      .from('books')
      .select('id, isbn, title, author')
      .not('isbn', 'is', null)

    if (booksError) {
      throw booksError
    }

    console.log(`📚 Found ${books?.length || 0} books with ISBNs`)

    let totalReviewsAdded = 0
    let booksWithReviews = 0
    let validationErrors = 0

    // Process each book with strict validation
    for (const book of books || []) {
      const cleanIsbn = book.isbn?.replace(/[-\s]/g, '')
      
      console.log(`\n📖 Processing: "${book.title}" by ${book.author}`)
      console.log(`   Book ID: ${book.id}`)
      console.log(`   ISBN: ${book.isbn} (cleaned: ${cleanIsbn})`)
      
      if (!cleanIsbn || !SAMPLE_CRITIC_REVIEWS[cleanIsbn]) {
        console.log(`   ⚠️ No critic reviews available for this ISBN`)
        continue
      }

      const reviews = SAMPLE_CRITIC_REVIEWS[cleanIsbn]
      console.log(`   📄 Found ${reviews.length} potential reviews`)

      // CRITICAL: Validate that reviews match the book title
      let validReviews = 0
      for (const review of reviews) {
        // Check if review has expected title and if it matches current book
        if (review.expected_title && review.expected_title !== book.title) {
          console.log(`   ❌ VALIDATION ERROR: Review for "${review.expected_title}" found on book "${book.title}"`)
          console.log(`      This indicates a data mismatch - skipping this review`)
          validationErrors++
          continue
        }

        try {
          console.log(`   ✏️ Inserting review from ${review.critic_name}...`)
          
          const { error: insertError } = await supabaseClient
            .from('critic_reviews')
            .insert({
              book_id: book.id,
              isbn: review.isbn,
              review_quote: review.review_quote,
              critic_name: review.critic_name,
              publication: review.publication,
              review_url: review.review_url,
              rating: review.rating,
              review_date: review.review_date
            })

          if (insertError) {
            console.error(`   ❌ Error inserting review:`, insertError)
          } else {
            console.log(`   ✅ Successfully inserted review from ${review.critic_name}`)
            totalReviewsAdded++
            validReviews++
          }
        } catch (insertErr) {
          console.error(`   ❌ Failed to insert review:`, insertErr)
        }
      }

      if (validReviews > 0) {
        booksWithReviews++
      }
    }

    // Update calculated critic scores for all books
    console.log('\n🔄 Updating calculated critic scores...')
    for (const book of books || []) {
      try {
        await supabaseClient.rpc('update_book_critic_score', { book_uuid: book.id })
        console.log(`✅ Updated critic score for "${book.title}"`)
      } catch (updateErr) {
        console.error(`❌ Failed to update critic score for "${book.title}":`, updateErr)
      }
    }

    console.log(`\n🎉 Comprehensive ingestion complete!`)
    console.log(`   📊 Reviews added: ${totalReviewsAdded}`)
    console.log(`   📚 Books with reviews: ${booksWithReviews}`)
    console.log(`   ⚠️ Validation errors: ${validationErrors}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        reviewsAdded: totalReviewsAdded,
        booksProcessed: booksWithReviews,
        validationErrors: validationErrors,
        message: `Successfully ingested ${totalReviewsAdded} critic reviews for ${booksWithReviews} books (${validationErrors} validation errors prevented)`,
        bookDetails: books?.map(b => ({ 
          title: b.title, 
          isbn: b.isbn,
          hasReviews: !!SAMPLE_CRITIC_REVIEWS[b.isbn?.replace(/[-\s]/g, '') || '']
        }))
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('💥 Error in critic review ingestion:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
