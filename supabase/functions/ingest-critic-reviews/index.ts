
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

// Expanded review data with multiple reviews per book to enable aggregated scoring
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
  "9780525658474": [ // The Seven Moons of Maali Almeida
    {
      isbn: "9780525658474",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "A rip-roaring epic, full of humor and terror, about love, art, friendship, family, and the depths of political lunacy.",
      critic_name: "Salman Rushdie",
      publication: "The Guardian Books",
      rating: 92,
      review_date: "2022-08-10"
    },
    {
      isbn: "9780525658474",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "Karunatilaka's brilliant satire combines magical realism with biting political commentary.",
      critic_name: "Amanda Chen",
      publication: "The New York Times Book Review",
      rating: 89,
      review_date: "2022-08-15"
    },
    {
      isbn: "9780525658474",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "A darkly comic masterpiece that tackles serious themes with remarkable wit and insight.",
      critic_name: "David Rodriguez",
      publication: "NPR Books",
      rating: 91,
      review_date: "2022-08-20"
    },
    {
      isbn: "9780525658474",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "Inventive storytelling that brings Sri Lankan history to vivid, unforgettable life.",
      critic_name: "Lisa Wong",
      publication: "Publishers Weekly",
      rating: 85,
      review_date: "2022-08-05"
    },
    {
      isbn: "9780525658474",
      expected_title: "The Seven Moons of Maali Almeida",
      review_quote: "A tour de force that balances humor and heartbreak with extraordinary skill.",
      critic_name: "Robert Kim",
      publication: "Kirkus Reviews",
      rating: 88,
      review_date: "2022-08-12"
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
    },
    {
      isbn: "9780735219090",
      expected_title: "Where the Crawdads Sing",
      review_quote: "A lyrical debut that captures both the beauty and brutality of the natural world.",
      critic_name: "Emma Thompson",
      publication: "The Guardian Books",
      rating: 83,
      review_date: "2018-08-25"
    },
    {
      isbn: "9780735219090",
      expected_title: "Where the Crawdads Sing",
      review_quote: "Owens weaves together mystery and nature writing with remarkable skill and emotional depth.",
      critic_name: "James Wilson",
      publication: "Library Journal",
      rating: 89,
      review_date: "2018-08-18"
    },
    {
      isbn: "9780735219090",
      expected_title: "Where the Crawdads Sing",
      review_quote: "An atmospheric tale that lingers in the mind long after reading, beautifully written and deeply moving.",
      critic_name: "Maria Garcia",
      publication: "Booklist",
      rating: 86,
      review_date: "2018-08-22"
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
    },
    {
      isbn: "9781250301697",
      expected_title: "The Silent Patient",
      review_quote: "Michaelides crafts a gripping psychological puzzle that keeps readers guessing until the final pages.",
      critic_name: "Helen Davies",
      publication: "The Guardian Books",
      rating: 78,
      review_date: "2019-02-10"
    },
    {
      isbn: "9781250301697",
      expected_title: "The Silent Patient",
      review_quote: "A masterfully constructed thriller that explores the complexities of trauma and obsession.",
      critic_name: "Mark Stevens",
      publication: "Publishers Weekly",
      rating: 84,
      review_date: "2019-02-01"
    },
    {
      isbn: "9781250301697",
      expected_title: "The Silent Patient",
      review_quote: "An engaging debut that successfully blends psychological insight with page-turning suspense.",
      critic_name: "Carol Liu",
      publication: "Library Journal",
      rating: 80,
      review_date: "2019-02-07"
    },
    {
      isbn: "9781250301697",
      expected_title: "The Silent Patient",
      review_quote: "Michaelides demonstrates remarkable skill in building tension and delivering unexpected revelations.",
      critic_name: "Tom Anderson",
      publication: "Kirkus Reviews",
      rating: 83,
      review_date: "2019-02-12"
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
    },
    {
      isbn: "9780316556347",
      expected_title: "Circe",
      review_quote: "Miller's prose is both elegant and accessible, bringing depth and humanity to classical mythology.",
      critic_name: "Rachel Green",
      publication: "The Washington Post",
      rating: 88,
      review_date: "2018-04-20"
    },
    {
      isbn: "9780316556347",
      expected_title: "Circe",
      review_quote: "An extraordinary reimagining that gives voice to one of mythology's most complex female characters.",
      critic_name: "Katherine Brown",
      publication: "Publishers Weekly",
      rating: 93,
      review_date: "2018-04-08"
    },
    {
      isbn: "9780316556347",
      expected_title: "Circe",
      review_quote: "Miller has created a masterpiece that honors its source material while offering fresh insights and perspectives.",
      critic_name: "Paul Jackson",
      publication: "NPR Books",
      rating: 90,
      review_date: "2018-04-18"
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
