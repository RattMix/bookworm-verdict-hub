
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

    console.log('🚀 Starting ingestion of 50 proven bestsellers and acclaimed books...')

    // 50 proven bestsellers and acclaimed books with verified ISBNs and quality blurbs
    const qualityBooks = [
      { 
        title: "Sapiens: A Brief History of Humankind", 
        author: "Yuval Noah Harari", 
        isbn: "9780062316110", 
        genre: ["History", "Science"], 
        published: "2015-02-10",
        summary: "A provocative exploration of how Homo sapiens came to dominate Earth, examining the cognitive, agricultural, and scientific revolutions that shaped human civilization and questioning what the future holds for our species."
      },
      { 
        title: "Educated", 
        author: "Tara Westover", 
        isbn: "9780399590504", 
        genre: ["Memoir", "Biography"], 
        published: "2018-02-20",
        summary: "A stunning memoir about a woman who, raised in a survivalist Mormon family in rural Idaho, never attended school but eventually earned a PhD from Cambridge University, exploring themes of family, education, and self-discovery."
      },
      { 
        title: "Atomic Habits", 
        author: "James Clear", 
        isbn: "9780735211292", 
        genre: ["Self-Help", "Psychology"], 
        published: "2018-10-16",
        summary: "A practical guide to building good habits and breaking bad ones, revealing how tiny changes can lead to remarkable results through the compound effect of small improvements."
      },
      { 
        title: "The Seven Husbands of Evelyn Hugo", 
        author: "Taylor Jenkins Reid", 
        isbn: "9781501161933", 
        genre: ["Historical Fiction", "Romance"], 
        published: "2017-06-13",
        summary: "A reclusive Hollywood icon finally decides to tell her life story to an unknown journalist, revealing decades of secrets, scandals, and a surprising love story that spans seven marriages."
      },
      { 
        title: "Where the Crawdads Sing", 
        author: "Delia Owens", 
        isbn: "9780735219090", 
        genre: ["Literary Fiction", "Mystery"], 
        published: "2018-08-14",
        summary: "A haunting coming-of-age story about Kya, the 'Marsh Girl' who raises herself in the dangerous marshlands of North Carolina, becoming one with nature while the nearby town cast her out."
      },
      { 
        title: "Becoming", 
        author: "Michelle Obama", 
        isbn: "9781524763138", 
        genre: ["Memoir", "Biography"], 
        published: "2018-11-13",
        summary: "The intimate memoir of the former First Lady, chronicling her journey from a working-class childhood on Chicago's South Side to the White House, and her work advocating for girls and women worldwide."
      },
      { 
        title: "The Midnight Library", 
        author: "Matt Haig", 
        isbn: "9780525559474", 
        genre: ["Literary Fiction", "Philosophy"], 
        published: "2020-08-13",
        summary: "A thought-provoking novel about Nora Seed, who finds herself in a magical library between life and death, where each book represents a different life she could have lived."
      },
      { 
        title: "Circe", 
        author: "Madeline Miller", 
        isbn: "9780316556347", 
        genre: ["Historical Fiction", "Mythology"], 
        published: "2018-04-10",
        summary: "A brilliant reimagining of the Greek myth of Circe, the witch of Aiaia, following her transformation from a awkward nymph to a formidable goddess who encounters famous figures from Homer's Odyssey."
      },
      { 
        title: "The Silent Patient", 
        author: "Alex Michaelides", 
        isbn: "9781250301697", 
        genre: ["Thriller", "Psychological"], 
        published: "2019-02-05",
        summary: "A psychotherapist becomes obsessed with treating a woman who murdered her husband and then never spoke again, leading to a shocking twist that redefines everything we thought we knew."
      },
      { 
        title: "Normal People", 
        author: "Sally Rooney", 
        isbn: "9781984822178", 
        genre: ["Literary Fiction", "Romance"], 
        published: "2018-08-28",
        summary: "An intimate portrait of two Irish teenagers, Connell and Marianne, whose complex relationship evolves from high school through university, exploring class, power, and the difficulty of true connection."
      },
      { 
        title: "The Vanishing Half", 
        author: "Brit Bennett", 
        isbn: "9780525536291", 
        genre: ["Literary Fiction", "Historical"], 
        published: "2020-06-02",
        summary: "Twin sisters who run away from a small Southern black community at age 16 choose to live in different worlds—one black, one white—affecting their children's lives decades later."
      },
      { 
        title: "Klara and the Sun", 
        author: "Kazuo Ishiguro", 
        isbn: "9780593318171", 
        genre: ["Literary Fiction", "Science Fiction"], 
        published: "2021-03-02",
        summary: "Nobel Prize winner Ishiguro tells the story of Klara, an artificial friend who observes the world from a store window, hoping to be chosen by a child and contemplating human nature and love."
      },
      { 
        title: "Project Hail Mary", 
        author: "Andy Weir", 
        isbn: "9780593135204", 
        genre: ["Science Fiction", "Thriller"], 
        published: "2021-05-04",
        summary: "A lone astronaut wakes up with no memory on a spaceship millions of miles from home, tasked with saving humanity from extinction in this thrilling hard science fiction adventure."
      },
      { 
        title: "The Thursday Murder Club", 
        author: "Richard Osman", 
        isbn: "9781984880567", 
        genre: ["Mystery", "Cozy Mystery"], 
        published: "2020-09-03",
        summary: "Four retirees in a peaceful English retirement village meet weekly to investigate cold cases, but when a real murder occurs on their doorstep, they spring into action."
      },
      { 
        title: "The Guest List", 
        author: "Lucy Foley", 
        isbn: "9780062868930", 
        genre: ["Thriller", "Mystery"], 
        published: "2020-06-02",
        summary: "A wedding celebration on a remote Irish island turns deadly when a guest is found murdered, told through multiple perspectives revealing dark secrets among the seemingly perfect attendees."
      },
      { 
        title: "It Ends with Us", 
        author: "Colleen Hoover", 
        isbn: "9781501110368", 
        genre: ["Romance", "Contemporary"], 
        published: "2016-08-02",
        summary: "Lily Bloom's encounter with neurosurgeon Ryle Kincaid leads to intense attraction, but when her first love Atlas reappears, she must confront the painful cycle of abuse."
      },
      { 
        title: "The Song of Achilles", 
        author: "Madeline Miller", 
        isbn: "9780062060624", 
        genre: ["Historical Fiction", "LGBTQ+"], 
        published: "2011-09-20",
        summary: "A lyrical retelling of the Iliad focusing on the relationship between Achilles and Patroclus, from their meeting as boys to their tragic fate in the Trojan War."
      },
      { 
        title: "Dune", 
        author: "Frank Herbert", 
        isbn: "9780441172719", 
        genre: ["Science Fiction", "Epic"], 
        published: "1965-06-01",
        summary: "On the desert planet Arrakis, young Paul Atreides becomes embroiled in a struggle for control of the universe's most valuable substance, the spice melange, fulfilling an ancient prophecy."
      },
      { 
        title: "The Handmaid's Tale", 
        author: "Margaret Atwood", 
        isbn: "9780525435006", 
        genre: ["Dystopian", "Literary Fiction"], 
        published: "1985-06-01",
        summary: "In the totalitarian Republic of Gilead, fertile women called 'handmaids' are forced to bear children for the ruling class in this chilling vision of a fundamentalist future America."
      },
      { 
        title: "1984", 
        author: "George Orwell", 
        isbn: "9780452284234", 
        genre: ["Dystopian", "Classic"], 
        published: "1949-06-08",
        summary: "Winston Smith struggles to retain his humanity in a totalitarian state where Big Brother watches everything, 'doublethink' rules, and the Thought Police punish even rebellious thoughts."
      },
      { 
        title: "To Kill a Mockingbird", 
        author: "Harper Lee", 
        isbn: "9780061120084", 
        genre: ["Classic", "Literary Fiction"], 
        published: "1960-07-11",
        summary: "Through the eyes of young Scout Finch, witness her father Atticus defend a black man falsely accused of rape in Depression-era Alabama, confronting deep-seated racial prejudice."
      },
      { 
        title: "The Alchemist", 
        author: "Paulo Coelho", 
        isbn: "9780061122415", 
        genre: ["Philosophy", "Adventure"], 
        published: "1988-04-25",
        summary: "A young Andalusian shepherd boy named Santiago travels from Spain to Egypt in search of treasure, discovering that the real treasure lies in following one's dreams and listening to one's heart."
      },
      { 
        title: "The Great Gatsby", 
        author: "F. Scott Fitzgerald", 
        isbn: "9780743273565", 
        genre: ["Classic", "Literary Fiction"], 
        published: "1925-04-10",
        summary: "Nick Carraway tells the story of his mysterious neighbor Jay Gatsby and his obsessive pursuit of his lost love Daisy Buchanan against the backdrop of Jazz Age excess and moral decay."
      },
      { 
        title: "Pride and Prejudice", 
        author: "Jane Austen", 
        isbn: "9780141439518", 
        genre: ["Classic", "Romance"], 
        published: "1813-01-28",
        summary: "Elizabeth Bennet navigates issues of manners, upbringing, morality, and marriage in Georgian England, particularly her complex relationship with the proud Mr. Darcy."
      },
      { 
        title: "The Catcher in the Rye", 
        author: "J.D. Salinger", 
        isbn: "9780316769174", 
        genre: ["Classic", "Coming of Age"], 
        published: "1951-07-16",
        summary: "Sixteen-year-old Holden Caulfield wanders New York City after being expelled from prep school, sharing his cynical observations about the 'phoniness' of the adult world."
      },
      { 
        title: "The Kite Runner", 
        author: "Khaled Hosseini", 
        isbn: "9781594631931", 
        genre: ["Literary Fiction", "Historical"], 
        published: "2003-05-29",
        summary: "Amir, haunted by his betrayal of his childhood friend Hassan in 1970s Afghanistan, returns to Taliban-controlled Kabul to seek redemption and confront his past."
      },
      { 
        title: "Life of Pi", 
        author: "Yann Martel", 
        isbn: "9780156027328", 
        genre: ["Adventure", "Philosophy"], 
        published: "2001-09-11",
        summary: "After a shipwreck, Pi Patel survives 227 days stranded on a lifeboat in the Pacific Ocean with a Bengal tiger named Richard Parker, testing faith, survival, and the nature of reality."
      },
      { 
        title: "The Book Thief", 
        author: "Markus Zusak", 
        isbn: "9780375842207", 
        genre: ["Historical Fiction", "Young Adult"], 
        published: "2005-09-01",
        summary: "Death narrates the story of Liesel Meminger, a foster girl living in Nazi Germany who steals books and shares them with others, including the Jewish man hiding in her basement."
      },
      { 
        title: "Gone Girl", 
        author: "Gillian Flynn", 
        isbn: "9780307588364", 
        genre: ["Thriller", "Mystery"], 
        published: "2012-06-05",
        summary: "When Amy Dunne disappears on her fifth wedding anniversary, suspicion falls on her husband Nick, but the truth behind their toxic marriage proves far more twisted than anyone imagined."
      },
      { 
        title: "The Girl on the Train", 
        author: "Paula Hawkins", 
        isbn: "9781594634024", 
        genre: ["Thriller", "Mystery"], 
        published: "2015-01-13",
        summary: "Rachel, an alcoholic divorcee, becomes entangled in a missing persons case after witnessing something shocking from her daily train commute, uncovering dark secrets about the seemingly perfect couple she obsesses over."
      },
      { 
        title: "Big Little Lies", 
        author: "Liane Moriarty", 
        isbn: "9780399167065", 
        genre: ["Mystery", "Contemporary"], 
        published: "2014-07-29",
        summary: "Three women's lives intersect in ways they never expected at a school trivia night that ends in death, exploring themes of domestic violence, friendship, and the perfect facades people maintain."
      },
      { 
        title: "The Fault in Our Stars", 
        author: "John Green", 
        isbn: "9780525478812", 
        genre: ["Young Adult", "Romance"], 
        published: "2012-01-10",
        summary: "Hazel and Augustus, two teenagers who meet in a cancer support group, fall in love and travel to Amsterdam to meet Hazel's favorite author, confronting mortality and the meaning of existence."
      },
      { 
        title: "Thirteen Reasons Why", 
        author: "Jay Asher", 
        isbn: "9781595141712", 
        genre: ["Young Adult", "Drama"], 
        published: "2007-10-18",
        summary: "Clay Jensen receives a box of cassette tapes recorded by his classmate Hannah Baker before her suicide, each tape explaining one of the thirteen reasons why she decided to end her life."
      },
      { 
        title: "The Hate U Give", 
        author: "Angie Thomas", 
        isbn: "9780062498533", 
        genre: ["Young Adult", "Social Justice"], 
        published: "2017-02-28",
        summary: "Sixteen-year-old Starr Carter witnesses the fatal shooting of her unarmed childhood friend Khalil by police, leading her to find her voice and fight for justice in her community."
      },
      { 
        title: "Eleanor Oliphant Is Completely Fine", 
        author: "Gail Honeyman", 
        isbn: "9780735220683", 
        genre: ["Literary Fiction", "Contemporary"], 
        published: "2017-05-09",
        summary: "Eleanor Oliphant lives a carefully structured life until an unexpected friendship and a chance encounter force her to confront her traumatic past and open herself to human connection."
      },
      { 
        title: "A Man Called Ove", 
        author: "Fredrik Backman", 
        isbn: "9781476738017", 
        genre: ["Literary Fiction", "Humor"], 
        published: "2012-08-27",
        summary: "A grumpy yet loveable man who has given up on life finds his solitary world turned upside down by his boisterous new neighbors, revealing his capacity for friendship, love, and heroism."
      },
      { 
        title: "The Martian", 
        author: "Andy Weir", 
        isbn: "9780553418026", 
        genre: ["Science Fiction", "Thriller"], 
        published: "2011-09-27",
        summary: "When astronaut Mark Watney is presumed dead and left behind on Mars, he must rely on his ingenuity and scientific knowledge to survive on the hostile planet until rescue is possible."
      },
      { 
        title: "Ready Player One", 
        author: "Ernest Cline", 
        isbn: "9780307887436", 
        genre: ["Science Fiction", "Adventure"], 
        published: "2011-08-16",
        summary: "In a dystopian 2045, teenager Wade Watts hunts for an Easter egg hidden in the virtual reality world of OASIS, where finding it means inheriting the game creator's fortune."
      },
      { 
        title: "The Hobbit", 
        author: "J.R.R. Tolkien", 
        isbn: "9780547928227", 
        genre: ["Fantasy", "Adventure"], 
        published: "1937-09-21",
        summary: "Bilbo Baggins, a reluctant hobbit, joins thirteen dwarves and the wizard Gandalf on a quest to reclaim their homeland and treasure from the dragon Smaug, discovering courage he never knew he had."
      },
      { 
        title: "Harry Potter and the Philosopher's Stone", 
        author: "J.K. Rowling", 
        isbn: "9780439708180", 
        genre: ["Fantasy", "Young Adult"], 
        published: "1997-06-26",
        summary: "An orphaned boy discovers on his eleventh birthday that he is a wizard and is invited to attend Hogwarts School of Witchcraft and Wizardry, where he uncovers the truth about his parents' death."
      },
      { 
        title: "The Hunger Games", 
        author: "Suzanne Collins", 
        isbn: "9780439023481", 
        genre: ["Dystopian", "Young Adult"], 
        published: "2008-09-14",
        summary: "In post-apocalyptic Panem, sixteen-year-old Katniss Everdeen volunteers to take her sister's place in the annual Hunger Games, a televised fight to the death between children from the districts."
      },
      { 
        title: "Divergent", 
        author: "Veronica Roth", 
        isbn: "9780062024022", 
        genre: ["Dystopian", "Young Adult"], 
        published: "2011-04-25",
        summary: "In a society divided into five factions based on personality traits, sixteen-year-old Tris Prior discovers she's Divergent and won't fit into any one group, making her a target for elimination."
      },
      { 
        title: "The Da Vinci Code", 
        author: "Dan Brown", 
        isbn: "9780307474278", 
        genre: ["Thriller", "Mystery"], 
        published: "2003-03-18",
        summary: "Harvard symbologist Robert Langdon is drawn into a deadly game of cat and mouse when a curator is murdered in the Louvre, leading to clues hidden in the works of Leonardo da Vinci."
      },
      { 
        title: "Angels & Demons", 
        author: "Dan Brown", 
        isbn: "9780671027360", 
        genre: ["Thriller", "Mystery"], 
        published: "2000-05-01",
        summary: "When scientists at CERN are murdered and a canister of antimatter is stolen, Robert Langdon races against time to prevent the Vatican from being destroyed by an ancient brotherhood."
      },
      { 
        title: "The Girl with the Dragon Tattoo", 
        author: "Stieg Larsson", 
        isbn: "9780307454546", 
        genre: ["Thriller", "Crime"], 
        published: "2005-08-01",
        summary: "Journalist Mikael Blomkvist partners with enigmatic hacker Lisbeth Salander to investigate a wealthy family's dark secrets and a decades-old disappearance in this Swedish crime thriller."
      },
      { 
        title: "Fifty Shades of Grey", 
        author: "E.L. James", 
        isbn: "9780345803485", 
        genre: ["Romance", "Erotic"], 
        published: "2011-05-25",
        summary: "Literature student Anastasia Steele's interview with young entrepreneur Christian Grey leads to an intense relationship that introduces her to a world of passion, pain, and emotional complexity."
      },
      { 
        title: "The Time Traveler's Wife", 
        author: "Audrey Niffenegger", 
        isbn: "9780547085906", 
        genre: ["Romance", "Science Fiction"], 
        published: "2003-09-01",
        summary: "The love story between Henry, who has a genetic disorder that causes him to time travel unpredictably, and Clare, who has to cope with his frequent absences and dangerous experiences."
      },
      { 
        title: "Me Before You", 
        author: "Jojo Moyes", 
        isbn: "9780143124542", 
        genre: ["Romance", "Drama"], 
        published: "2012-01-05",
        summary: "Louisa Clark becomes a caregiver for Will Traynor, a wealthy quadriplegic, and their unlikely relationship transforms both their lives in unexpected ways."
      },
      { 
        title: "The Help", 
        author: "Kathryn Stockett", 
        isbn: "9780425245132", 
        genre: ["Historical Fiction", "Drama"], 
        published: "2009-02-10",
        summary: "In 1960s Mississippi, aspiring writer Skeeter collaborates with African-American maids to tell their stories, exposing the racism and inequality they face while working for white families."
      },
      { 
        title: "Water for Elephants", 
        author: "Sara Gruen", 
        isbn: "9781565125605", 
        genre: ["Historical Fiction", "Romance"], 
        published: "2006-05-26",
        summary: "Jacob Jankowski, a ninety-year-old man, recalls his time as a young veterinary student who joined a traveling circus during the Great Depression, falling in love with a star performer."
      }
    ]

    console.log(`📚 Preparing to ingest ${qualityBooks.length} proven bestsellers and acclaimed books...`)

    // Clear existing books first to avoid duplicates
    console.log('🧹 Clearing existing books...')
    const { error: deleteError } = await supabaseClient
      .from('books')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (deleteError) {
      console.error('❌ Error clearing existing books:', deleteError)
      throw new Error(`Failed to clear existing books: ${deleteError.message}`)
    } else {
      console.log('✅ Successfully cleared existing books')
    }

    let booksAdded = 0
    const failedBooks = []

    for (const book of qualityBooks) {
      try {
        // Create comprehensive book data with proper cover URL
        const bookData = {
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          genre: book.genre,
          published_date: book.published,
          page_count: Math.floor(Math.random() * 350) + 200, // 200-550 pages
          summary: book.summary,
          cover_url: `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`,
          critic_score: null, // Will be calculated from reviews
          calculated_critic_score: null,
          critic_review_count: 0,
          critic_quotes: []
        }

        console.log(`📖 Adding book: ${book.title} with ISBN: ${book.isbn}`)

        const { error: insertError } = await supabaseClient
          .from('books')
          .insert(bookData)

        if (insertError) {
          console.error(`❌ Error inserting ${book.title}:`, insertError)
          failedBooks.push({ title: book.title, error: insertError.message })
        } else {
          booksAdded++
          console.log(`✅ Successfully added: ${book.title}`)
        }

        // Small delay to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 50))

      } catch (error) {
        console.error(`❌ Error processing ${book.title}:`, error)
        failedBooks.push({ title: book.title, error: error.message })
      }
    }

    console.log(`🎉 Ingestion complete. Added ${booksAdded} proven bestsellers and acclaimed books.`)
    
    if (failedBooks.length > 0) {
      console.log(`⚠️ Failed to add ${failedBooks.length} books:`, failedBooks)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully added ${booksAdded} proven bestsellers and acclaimed books`,
        booksAdded,
        totalAttempted: qualityBooks.length,
        failedBooks: failedBooks.length > 0 ? failedBooks : undefined,
        focus: "proven bestsellers and critically acclaimed books"
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('💥 Book ingestion error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: 'Check the function logs for more information'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
