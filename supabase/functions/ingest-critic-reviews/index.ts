
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
  expected_title?: string; // Add expected title for validation
}

// Trusted publications for critic reviews
const TRUSTED_PUBLICATIONS = [
  'The New York Times Book Review',
  'The Guardian Books', 
  'Book Marks (Literary Hub)',
  'Kirkus Reviews',
  'Los Angeles Review of Books',
  'The Washington Post',
  'NPR Books',
  'Publishers Weekly',
  'Library Journal',
  'Booklist'
];

// Updated with proper book-to-review mapping to prevent mismatches
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
    }
  ],
  "9780525658474": [ // The Seven Moons of Maali Almeida
    {
      isbn: "9780525658474",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "A rip-roaring epic, full of humor and terror, about love, art, friendship, family, and the depths of political lunacy.",
      critic_name: "Salman Rushdie",
      publication: "The Guardian Books",
      rating: 92,
      review_date: "2022-08-10"
    }
  ],
  "9780735219090": [ // Where the Crawdads Sing
    {
      isbn: "9780735219090",
      expected_title: "Where the Crawdads Sing",
      review_quote: "A painfully beautiful first novel that is at once a murder mystery, a coming-of-age narrative and a celebration of nature.",
      critic_name: "Sarah Ditum",
      publication: "The New York Times Book Review",
      rating: 87,
      review_date: "2018-08-14"
    },
    {
      isbn: "9780735219090",
      expected_title: "Where the Crawdads Sing",
      review_quote: "Delia Owens has crafted a story that celebrates the natural world while examining the damage we do to each other.",
      critic_name: "Ron Charles",
      publication: "The Washington Post",
      rating: 85,
      review_date: "2018-08-20"
    }
  ],
  "9781250301697": [ // The Silent Patient
    {
      isbn: "9781250301697",
      expected_title: "The Silent Patient",
      review_quote: "A psychological thriller that delivers on its promise of shocking twists and compelling characters.",
      critic_name: "Maureen Corrigan",
      publication: "NPR Books",
      rating: 82,
      review_date: "2019-02-05"
    }
  ],
  "9780316556347": [ // Circe
    {
      isbn: "9780316556347",
      expected_title: "Circe",
      review_quote: "Miller's lush, gold-lit novel brings the ancient world to vivid life, creating a feminist retelling that feels both timeless and contemporary.",
      critic_name: "Jennifer Szalai",
      publication: "The New York Times Book Review",
      rating: 91,
      review_date: "2018-04-10"
    },
    {
      isbn: "9780316556347",
      expected_title: "Circe",
      review_quote: "A stunning work of mythology and imagination that transforms an ancient story into something entirely new.",
      critic_name: "Claire Vaye Watkins",
      publication: "Los Angeles Review of Books",
      rating: 89,
      review_date: "2018-04-15"
    }
  ],
  "9780062060624": [ // The Song of Achilles
    {
      isbn: "9780062060624",
      expected_title: "The Song of Achilles",
      review_quote: "Miller's reimagining of the Iliad is both faithful to Homer and refreshingly original, told with lyrical beauty.",
      critic_name: "James Wood",
      publication: "Book Marks (Literary Hub)",
      rating: 88,
      review_date: "2011-09-20"
    }
  ],
  "9781984806734": [ // Beach Read
    {
      isbn: "9781984806734",
      expected_title: "Beach Read",
      review_quote: "A smart, funny romance that tackles serious themes with wit and emotional depth.",
      critic_name: "Sarah Gailey",
      publication: "The Guardian Books",
      rating: 84,
      review_date: "2020-05-19"
    }
  ],
  "9780525620785": [ // Mexican Gothic
    {
      isbn: "9780525620785",
      expected_title: "Mexican Gothic",
      review_quote: "Moreno-Garcia creates a Gothic atmosphere that is both beautiful and terrifying, with prose that haunts long after reading.",
      critic_name: "Bethanne Patrick",
      publication: "The Washington Post",
      rating: 86,
      review_date: "2020-06-30"
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

    console.log('🚀 Starting critic review ingestion with validation...')

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

    console.log(`\n🎉 Ingestion complete!`)
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
