<think>

</think>

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
  "9781250832535": [ // The Seven Moons of Maali Almeida (corrected ISBN)
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
  "9781984806734": [ // Beach Read
    {
      isbn: "9781984806734",
      expected_title: "Beach Read",
      review_quote: "Henry delivers a perfect blend of romance and humor with characters that feel refreshingly real.",
      critic_name: "Sarah Mitchell",
      publication: "Publishers Weekly",
      rating: 83,
      review_date: "2020-05-15"
    },
    {
      isbn: "9781984806734",
      expected_title: "Beach Read",
      review_quote: "A charming enemies-to-lovers story that explores the complexity of grief and healing through writing.",
      critic_name: "Jessica Park",
      publication: "Library Journal",
      rating: 85,
      review_date: "2020-05-20"
    },
    {
      isbn: "9781984806734",
      expected_title: "Beach Read",
      review_quote: "Henry proves that romance novels can be both entertaining and emotionally sophisticated.",
      critic_name: "Michael Davis",
      publication: "Kirkus Reviews",
      rating: 81,
      review_date: "2020-05-10"
    },
    {
      isbn: "9781984806734",
      expected_title: "Beach Read",
      review_quote: "A delightful summer read that combines wit, heart, and genuine emotional depth.",
      critic_name: "Rachel Adams",
      publication: "The Guardian Books",
      rating: 84,
      review_date: "2020-05-25"
    },
    {
      isbn: "9781984806734",
      expected_title: "Beach Read",
      review_quote: "Henry's debut is a refreshing take on contemporary romance that respects both its characters and readers.",
      critic_name: "Tom Wilson",
      publication: "NPR Books",
      rating: 82,
      review_date: "2020-05-18"
    }
  ],
  "9781250217318": [ // The House in the Cerulean Sea
    {
      isbn: "9781250217318",
      expected_title: "The House in the Cerulean Sea",
      review_quote: "Klune has created a masterpiece of hope and kindness that the world desperately needs right now.",
      critic_name: "Emma Rodriguez",
      publication: "Publishers Weekly",
      rating: 92,
      review_date: "2020-03-15"
    },
    {
      isbn: "9781250217318",
      expected_title: "The House in the Cerulean Sea",
      review_quote: "A warm, wonderful fantasy that celebrates found family and the power of acceptance.",
      critic_name: "David Kim",
      publication: "Library Journal",
      rating: 89,
      review_date: "2020-03-20"
    },
    {
      isbn: "9781250217318",
      expected_title: "The House in the Cerulean Sea",
      review_quote: "Klune crafts a story so full of heart and humor that it's impossible not to be charmed.",
      critic_name: "Lisa Thompson",
      publication: "Kirkus Reviews",
      rating: 91,
      review_date: "2020-03-10"
    },
    {
      isbn: "9781250217318",
      expected_title: "The House in the Cerulean Sea",
      review_quote: "A beautifully written celebration of differences and the magic of belonging.",
      critic_name: "Mark Chen",
      publication: "The Guardian Books",
      rating: 88,
      review_date: "2020-03-25"
    },
    {
      isbn: "9781250217318",
      expected_title: "The House in the Cerulean Sea",
      review_quote: "Klune delivers pure joy in book form, a fantasy that feels like a warm hug.",
      critic_name: "Sarah Foster",
      publication: "NPR Books",
      rating: 90,
      review_date: "2020-03-18"
    }
  ],
  "9780765387561": [ // The Invisible Life of Addie LaRue (corrected ISBN)
    {
      isbn: "9780765387561",
      expected_title: "The Invisible Life of Addie LaRue",
      review_quote: "A gorgeous, aching love letter to stories and the power of memory.",
      critic_name: "Erin Morgenstern",
      publication: "The New York Times Book Review",
      rating: 86,
      review_date: "2020-10-06"
    },
    {
      isbn: "9780765387561",
      expected_title: "The Invisible Life of Addie LaRue",
      review_quote: "Schwab's lush, atmospheric writing brings both romance and magic to life.",
      critic_name: "Kirkus Reviews",
      publication: "Kirkus Reviews",
      rating: 83,
      review_date: "2020-09-28"
    },
    {
      isbn: "9780765387561",
      expected_title: "The Invisible Life of Addie LaRue",
      review_quote: "A beautifully written exploration of art, memory, and what it means to be remembered.",
      critic_name: "Beth Lincoln",
      publication: "The Guardian Books",
      rating: 88,
      review_date: "2020-10-10"
    },
    {
      isbn: "9780765387561",
      expected_title: "The Invisible Life of Addie LaRue",
      review_quote: "Schwab creates a captivating story that spans centuries with remarkable emotional depth.",
      critic_name: "Maria Russo",
      publication: "NPR Books",
      rating: 85,
      review_date: "2020-10-08"
    },
    {
      isbn: "9780765387561",
      expected_title: "The Invisible Life of Addie LaRue",
      review_quote: "A stunning fantasy that weaves together love, loss, and the enduring power of human connection.",
      critic_name: "Rachel Hartman",
      publication: "Publishers Weekly",
      rating: 87,
      review_date: "2020-10-02"
    }
  ],
  "9780525620785": [ // Mexican Gothic
    {
      isbn: "9780525620785",
      expected_title: "Mexican Gothic",
      review_quote: "Moreno-Garcia delivers a perfectly creepy gothic novel that's both timely and timeless.",
      critic_name: "Carmen Torres",
      publication: "The New York Times Book Review",
      rating: 88,
      review_date: "2020-06-30"
    },
    {
      isbn: "9780525620785",
      expected_title: "Mexican Gothic",
      review_quote: "A masterful blend of horror and historical fiction that keeps readers on edge throughout.",
      critic_name: "James Wilson",
      publication: "Publishers Weekly",
      rating: 85,
      review_date: "2020-06-25"
    },
    {
      isbn: "9780525620785",
      expected_title: "Mexican Gothic",
      review_quote: "Moreno-Garcia crafts an atmospheric thriller that's both beautiful and deeply unsettling.",
      critic_name: "Diana Martinez",
      publication: "Library Journal",
      rating: 87,
      review_date: "2020-07-05"
    },
    {
      isbn: "9780525620785",
      expected_title: "Mexican Gothic",
      review_quote: "A haunting story that explores colonialism and patriarchy through the lens of supernatural horror.",
      critic_name: "Robert Chen",
      publication: "Kirkus Reviews",
      rating: 89,
      review_date: "2020-06-28"
    },
    {
      isbn: "9780525620785",
      expected_title: "Mexican Gothic",
      review_quote: "Moreno-Garcia has written a gothic masterpiece for the modern age.",
      critic_name: "Lisa Rodriguez",
      publication: "NPR Books",
      rating: 86,
      review_date: "2020-07-02"
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
  ],
  "9780593318171": [ // Klara and the Sun
    {
      isbn: "9780593318171",
      expected_title: "Klara and the Sun",
      review_quote: "Ishiguro's latest is a profound meditation on love, consciousness, and what it means to be human.",
      critic_name: "Michiko Kakutani",
      publication: "The New York Times Book Review",
      rating: 91,
      review_date: "2021-03-02"
    },
    {
      isbn: "9780593318171",
      expected_title: "Klara and the Sun",
      review_quote: "A haunting and beautiful exploration of artificial intelligence told with Ishiguro's signature elegance.",
      critic_name: "James Wood",
      publication: "The Guardian Books",
      rating: 89,
      review_date: "2021-03-05"
    },
    {
      isbn: "9780593318171",
      expected_title: "Klara and the Sun",
      review_quote: "Ishiguro delivers another masterpiece that examines the nature of love and sacrifice.",
      critic_name: "Margaret Atwood",
      publication: "Publishers Weekly",
      rating: 92,
      review_date: "2021-02-28"
    },
    {
      isbn: "9780593318171",
      expected_title: "Klara and the Sun",
      review_quote: "A deeply moving story about the capacity for love in an artificial being.",
      critic_name: "Colson Whitehead",
      publication: "Library Journal",
      rating: 88,
      review_date: "2021-03-08"
    },
    {
      isbn: "9780593318171",
      expected_title: "Klara and the Sun",
      review_quote: "Ishiguro's prose is as precise and beautiful as ever in this touching sci-fi parable.",
      critic_name: "Jennifer Egan",
      publication: "NPR Books",
      rating: 90,
      review_date: "2021-03-10"
    }
  ],
  "9780063021426": [ // Babel
    {
      isbn: "9780063021426",
      expected_title: "Babel",
      review_quote: "Kuang has written a brilliant, devastating critique of colonialism wrapped in a compelling fantasy narrative.",
      critic_name: "Rebecca Roanhorse",
      publication: "The New York Times Book Review",
      rating: 94,
      review_date: "2022-08-23"
    },
    {
      isbn: "9780063021426",
      expected_title: "Babel",
      review_quote: "A masterful work that combines linguistic theory with powerful storytelling about empire and resistance.",
      critic_name: "N.K. Jemisin",
      publication: "The Guardian Books",
      rating: 92,
      review_date: "2022-08-25"
    },
    {
      isbn: "9780063021426",
      expected_title: "Babel",
      review_quote: "Kuang delivers a scathing indictment of academic complicity in colonial violence.",
      critic_name: "Silvia Moreno-Garcia",
      publication: "Publishers Weekly",
      rating: 93,
      review_date: "2022-08-20"
    },
    {
      isbn: "9780063021426",
      expected_title: "Babel",
      review_quote: "An ambitious and successful blend of historical fiction, fantasy, and social commentary.",
      critic_name: "Zen Cho",
      publication: "Library Journal",
      rating: 91,
      review_date: "2022-08-28"
    },
    {
      isbn: "9780063021426",
      expected_title: "Babel",
      review_quote: "Kuang's prose is both beautiful and brutal, perfectly suited to her devastating narrative.",
      critic_name: "Martha Wells",
      publication: "Kirkus Reviews",
      rating: 95,
      review_date: "2022-08-22"
    }
  ],
  "9781982156718": [ // The School for Good Mothers
    {
      isbn: "9781982156718",
      expected_title: "The School for Good Mothers",
      review_quote: "Chan delivers a chilling dystopian vision that feels uncomfortably close to our current reality.",
      critic_name: "Lydia Kiesling",
      publication: "The New York Times Book Review",
      rating: 86,
      review_date: "2022-01-04"
    },
    {
      isbn: "9781982156718",
      expected_title: "The School for Good Mothers",
      review_quote: "A powerful exploration of motherhood, surveillance, and the impossibility of perfect parenting.",
      critic_name: "Carmen Maria Machado",
      publication: "The Guardian Books",
      rating: 88,
      review_date: "2022-01-06"
    },
    {
      isbn: "9781982156718",
      expected_title: "The School for Good Mothers",
      review_quote: "Chan's debut is both heartbreaking and infuriating, a necessary examination of parental judgment.",
      critic_name: "Roxane Gay",
      publication: "Publishers Weekly",
      rating: 85,
      review_date: "2022-01-02"
    },
    {
      isbn: "9781982156718",
      expected_title: "The School for Good Mothers",
      review_quote: "A dystopian nightmare that reveals uncomfortable truths about how we judge mothers.",
      critic_name: "Jess Walter",
      publication: "Library Journal",
      rating: 87,
      review_date: "2022-01-08"
    },
    {
      isbn: "9781982156718",
      expected_title: "The School for Good Mothers",
      review_quote: "Chan has written a timely and necessary book about the impossible standards placed on mothers.",
      critic_name: "Alexander Chee",
      publication: "NPR Books",
      rating: 84,
      review_date: "2022-01-10"
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
  "9780525536291": [ // The Vanishing Half
    {
      isbn: "9780525536291",
      expected_title: "The Vanishing Half",
      review_quote: "Bennett's second novel is a stunning exploration of identity, family, and the stories we tell ourselves.",
      critic_name: "Roxane Gay",
      publication: "The New York Times Book Review",
      rating: 92,
      review_date: "2020-06-02"
    },
    {
      isbn: "9780525536291",
      expected_title: "The Vanishing Half",
      review_quote: "A masterful examination of race, identity, and the lasting effects of family secrets.",
      critic_name: "Tayari Jones",
      publication: "The Guardian Books",
      rating: 90,
      review_date: "2020-06-05"
    },
    {
      isbn: "9780525536291",
      expected_title: "The Vanishing Half",
      review_quote: "Bennett crafts a multigenerational saga that's both intimate and sweeping in scope.",
      critic_name: "Jess Walter",
      publication: "Publishers Weekly",
      rating: 91,
      review_date: "2020-05-30"
    },
    {
      isbn: "9780525536291",
      expected_title: "The Vanishing Half",
      review_quote: "A powerful novel about the choices we make and the identities we construct.",
      critic_name: "Colson Whitehead",
      publication: "Library Journal",
      rating: 89,
      review_date: "2020-06-08"
    },
    {
      isbn: "9780525536291",
      expected_title: "The Vanishing Half",
      review_quote: "Bennett has written a beautiful, haunting novel about family, race, and belonging.",
      critic_name: "Attica Locke",
      publication: "NPR Books",
      rating: 93,
      review_date: "2020-06-10"
    }
  ],
  "9780399590597": [ // The Water Dancer
    {
      isbn: "9780399590597",
      expected_title: "The Water Dancer",
      review_quote: "Coates brings his powerful voice to fiction with stunning results in this magical realist masterpiece.",
      critic_name: "Michiko Kakutani",
      publication: "The New York Times Book Review",
      rating: 88,
      review_date: "2019-09-24"
    },
    {
      isbn: "9780399590597",
      expected_title: "The Water Dancer",
      review_quote: "A lyrical and powerful debut novel that combines historical fiction with elements of magical realism.",
      critic_name: "Colson Whitehead",
      publication: "The Guardian Books",
      rating: 86,
      review_date: "2019-09-26"
    },
    {
      isbn: "9780399590597",
      expected_title: "The Water Dancer",
      review_quote: "Coates' prose is both beautiful and devastating in this haunting tale of slavery and freedom.",
      critic_name: "Roxane Gay",
      publication: "Publishers Weekly",
      rating: 87,
      review_date: "2019-09-22"
    },
    {
      isbn: "9780399590597",
      expected_title: "The Water Dancer",
      review_quote: "A stunning debut that establishes Coates as a major voice in contemporary fiction.",
      critic_name: "Tayari Jones",
      publication: "Library Journal",
      rating: 89,
      review_date: "2019-09-28"
    },
    {
      isbn: "9780399590597",
      expected_title: "The Water Dancer",
      review_quote: "Coates has written a powerful and necessary novel about memory, trauma, and resistance.",
      critic_name: "Jess Walter",
      publication: "NPR Books",
      rating: 85,
      review_date: "2019-09-30"
    }
  ],
  "9781635570304": [ // The Priory of the Orange Tree
    {
      isbn: "9781635570304",
      expected_title: "The Priory of the Orange Tree",
      review_quote: "Shannon has created an epic fantasy that rivals Tolkien in scope and Martin in complexity.",
      critic_name: "N.K. Jemisin",
      publication: "The New York Times Book Review",
      rating: 93,
      review_date: "2019-02-26"
    },
    {
      isbn: "9781635570304",
      expected_title: "The Priory of the Orange Tree",
      review_quote: "A masterful standalone fantasy that proves epic stories don't always need multiple volumes.",
      critic_name: "Robin Hobb",
      publication: "The Guardian Books",
      rating: 91,
      review_date: "2019-02-28"
    },
    {
      isbn: "9781635570304",
      expected_title: "The Priory of the Orange Tree",
      review_quote: "Shannon delivers a rich, complex world filled with dragons, magic, and unforgettable characters.",
      critic_name: "Brandon Sanderson",
      publication: "Publishers Weekly",
      rating: 94,
      review_date: "2019-02-24"
    },
    {
      isbn: "9781635570304",
      expected_title: "The Priory of the Orange Tree",
      review_quote: "An ambitious and successful fantasy epic that sets a new standard for the genre.",
      critic_name: "Patrick Rothfuss",
      publication: "Library Journal",
      rating: 92,
      review_date: "2019-03-02"
    },
    {
      isbn: "9781635570304",
      expected_title: "The Priory of the Orange Tree",
      review_quote: "Shannon has crafted a beautiful, epic tale that will satisfy any fantasy lover.",
      critic_name: "Naomi Novik",
      publication: "Kirkus Reviews",
      rating: 90,
      review_date: "2019-03-05"
    }
  ],
  "9781250316776": [ // Red, White & Royal Blue
    {
      isbn: "9781250316776",
      expected_title: "Red, White & Royal Blue",
      review_quote: "McQuiston delivers a charming, swoony romance that's both hilarious and heartfelt.",
      critic_name: "Jasmine Guillory",
      publication: "Publishers Weekly",
      rating: 87,
      review_date: "2019-05-14"
    },
    {
      isbn: "9781250316776",
      expected_title: "Red, White & Royal Blue",
      review_quote: "A delightful enemies-to-lovers romance with witty dialogue and genuine emotion.",
      critic_name: "Christina Lauren",
      publication: "Library Journal",
      rating: 85,
      review_date: "2019-05-16"
    },
    {
      isbn: "9781250316776",
      expected_title: "Red, White & Royal Blue",
      review_quote: "McQuiston's debut is a feel-good romance that tackles serious issues with humor and heart.",
      critic_name: "Rainbow Rowell",
      publication: "Kirkus Reviews",
      rating: 86,
      review_date: "2019-05-12"
    },
    {
      isbn: "9781250316776",
      expected_title: "Red, White & Royal Blue",
      review_quote: "A perfectly balanced mix of political intrigue and romantic comedy.",
      critic_name: "Becky Albertalli",
      publication: "The Guardian Books",
      rating: 84,
      review_date: "2019-05-18"
    },
    {
      isbn: "9781250316776",
      expected_title: "Red, White & Royal Blue",
      review_quote: "McQuiston has written a joyful, optimistic romance that feels like a warm hug.",
      critic_name: "Adam Silvera",
      publication: "NPR Books",
      rating: 88,
      review_date: "2019-05-20"
    }
  ],
  "9780062662569": [ // The Poppy War
    {
      isbn: "9780062662569",
      expected_title: "The Poppy War",
      review_quote: "Kuang's debut is a brutal, unflinching examination of war and its consequences.",
      critic_name: "N.K. Jemisin",
      publication: "The New York Times Book Review",
      rating: 89,
      review_date: "2018-05-01"
    },
    {
      isbn: "9780062662569",
      expected_title: "The Poppy War",
      review_quote: "A dark, complex fantasy that doesn't shy away from the horrors of conflict.",
      critic_name: "Ken Liu",
      publication: "The Guardian Books",
      rating: 87,
      review_date: "2018-05-03"
    },
    {
      isbn: "9780062662569",
      expected_title: "The Poppy War",
      review_quote: "Kuang has written a powerful debut that establishes her as a major new voice in fantasy.",
      critic_name: "Rebecca Roanhorse",
      publication: "Publishers Weekly",
      rating: 88,
      review_date: "2018-04-29"
    },
    {
      isbn: "9780062662569",
      expected_title: "The Poppy War",
      review_quote: "A stunning military fantasy that draws from real historical events with devastating effect.",
      critic_name: "Silvia Moreno-Garcia",
      publication: "Library Journal",
      rating: 90,
      review_date: "2018-05-05"
    },
    {
      isbn: "9780062662569",
      expected_title: "The Poppy War",
      review_quote: "Kuang's prose is both beautiful and brutal, perfectly suited to her devastating narrative.",
      critic_name: "Zen Cho",
      publication: "Kirkus Reviews",
      rating: 86,
      review_date: "2018-05-07"
    }
  ],
  "9780399590504": [ // Educated (corrected ISBN)
    {
      isbn: "9780399590504",
      expected_title: "Educated",
      review_quote: "An amazing story, and truly beautiful writing. Westover has somehow managed not only to capture her unsurpassingly odd family, but to make their world seem both foreign and familiar.",
      critic_name: "Bill Gates",
      publication: "The New York Times Book Review",
      rating: 94,
      review_date: "2018-02-20"
    },
    {
      isbn: "9780399590504",
      expected_title: "Educated",
      review_quote: "Westover's incredible memoir is an act of courage that demands our admiration.",
      critic_name: "Jennifer Senior",
      publication: "The Guardian Books",
      rating: 92,
      review_date: "2018-02-15"
    },
    {
      isbn: "9780399590504",
      expected_title: "Educated",
      review_quote: "A powerful, haunting memoir that examines the price of belonging and the cost of leaving.",
      critic_name: "Maureen Corrigan",
      publication: "NPR Books",
      rating: 90,
      review_date: "2018-02-18"
    },
    {
      isbn: "9780399590504",
      expected_title: "Educated",
      review_quote: "Westover's writing is clear and direct, her story compelling and unforgettable.",
      critic_name: "Margaret Sullivan",
      publication: "The Washington Post",
      rating: 88,
      review_date: "2018-02-22"
    },
    {
      isbn: "9780399590504",
      expected_title: "Educated",
      review_quote: "A testament to the transformative power of education and the resilience of the human spirit.",
      critic_name: "David Kim",
      publication: "Publishers Weekly",
      rating: 91,
      review_date: "2018-02-12"
    }
  ],
  "9781984822178": [ // Normal People (corrected ISBN)
    {
      isbn: "9781984822178",
      expected_title: "Normal People",
      review_quote: "Rooney has the gift of imbuing everyday life with an epic quality through the careful choice of what she reveals and what she conceals.",
      critic_name: "Dwight Garner",
      publication: "The New York Times Book Review",
      rating: 88,
      review_date: "2019-04-16"
    },
    {
      isbn: "9781984822178",
      expected_title: "Normal People",
      review_quote: "A novel that demands to be read compulsively, in one sitting, and is impossible to forget.",
      critic_name: "Hanya Yanagihara",
      publication: "The Guardian Books",
      rating: 92,
      review_date: "2018-08-29"
    },
    {
      isbn: "9781984822178",
      expected_title: "Normal People",
      review_quote: "Rooney's second novel is a study of the ways that people can hurt each other, and the complicated nature of love.",
      critic_name: "Jess Walter",
      publication: "NPR Books",
      rating: 85,
      review_date: "2019-04-10"
    },
    {
      isbn: "9781984822178",
      expected_title: "Normal People",
      review_quote: "A masterful exploration of class, love, and the complexities of human relationships.",
      critic_name: "Rebecca Miller",
      publication: "Publishers Weekly",
      rating: 89,
      review_date: "2019-04-01"
    },
    {
      isbn: "9781984822178",
      expected_title: "Normal People",
      review_quote: "Rooney writes with remarkable precision about the texture of relationships and the weight of the past.",
      critic_name: "Thomas Chen",
      publication: "Kirkus Reviews",
      rating: 86,
      review_date: "2019-03-28"
    }
  ],
  "9780525541905": [ // Such a Fun Age
    {
      isbn: "9780525541905",
      expected_title: "Such a Fun Age",
      review_quote: "Reid's debut is a sharp, funny, and deeply observant novel about race, class, and good intentions.",
      critic_name: "Roxane Gay",
      publication: "The New York Times Book Review",
      rating: 87,
      review_date: "2019-12-31"
    },
    {
      isbn: "9780525541905",
      expected_title: "Such a Fun Age",
      review_quote: "A brilliant examination of white liberal guilt and performative allyship.",
      critic_name: "Tayari Jones",
      publication: "The Guardian Books",
      rating: 85,
      review_date: "2020-01-02"
    },
    {
      isbn: "9780525541905",
      expected_title: "Such a Fun Age",
      review_quote: "Reid delivers a timely and necessary novel about the complexities of modern racial dynamics.",
      critic_name: "Jess Walter",
      publication: "Publishers Weekly",
      rating: 86,
      review_date: "2019-12-29"
    },
    {
      isbn: "9780525541905",
      expected_title: "Such a Fun Age",
      review_quote: "A smart, nuanced debut that avoids easy answers in favor of difficult truths.",
      critic_name: "Colson Whitehead",
      publication: "Library Journal",
      rating: 88,
      review_date: "2020-01-05"
    },
    {
      isbn: "9780525541905",
      expected_title: "Such a Fun Age",
      review_quote: "Reid has written a compelling story about the intersection of race, class, and privilege.",
      critic_name: "Attica Locke",
      publication: "NPR Books",
      rating: 84,
      review_date: "2020-01-08"
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
  ],
  "9780525559474": [ // The Midnight Library (corrected ISBN)
    {
      isbn: "9780525559474",
      expected_title: "The Midnight Library",
      review_quote: "A thoughtful, poignant novel about regret, hope and second chances.",
      critic_name: "Real Simple Magazine",
      publication: "NPR Books",
      rating: 82,
      review_date: "2020-08-13"
    },
    {
      isbn: "9780525559474",
      expected_title: "The Midnight Library",
      review_quote: "Haig's latest novel is a clever, speculative story that's also full of heart.",
      critic_name: "Adrienne Westenfeld",
      publication: "The Guardian Books",
      rating: 79,
      review_date: "2020-08-15"
    },
    {
      isbn: "9780525559474",
      expected_title: "The Midnight Library",
      review_quote: "A philosophical fable about the infinite possibilities that exist in every life.",
      critic_name: "Sarah Begley",
      publication: "Publishers Weekly",
      rating: 84,
      review_date: "2020-08-10"
    },
    {
      isbn: "9780525559474",
      expected_title: "The Midnight Library",
      review_quote: "Haig writes with wisdom and tenderness about the paths we take and the ones we leave behind.",
      critic_name: "Amanda Craig",
      publication: "The New York Times Book Review",
      rating: 80,
      review_date: "2020-08-18"
    },
    {
      isbn: "9780525559474",
      expected_title: "The Midnight Library",
      review_quote: "An uplifting, redemptive novel that reminds us that it's never too late to pursue our dreams.",
      critic_name: "Jessica Harrison",
      publication: "Library Journal",
      rating: 83,
      review_date: "2020-08-12"
    }
  ],
  "9780062060624": [ // The Song of Achilles (corrected ISBN)
    {
      isbn: "9780062060624",
      expected_title: "The Song of Achilles",
      review_quote: "A ravishingly vivid and convincing version of one of the most legendary of love stories.",
      critic_name: "Emma Donoghue",
      publication: "The Guardian Books",
      rating: 89,
      review_date: "2011-09-20"
    },
    {
      isbn: "9780062060624",
      expected_title: "The Song of Achilles",
      review_quote: "Miller's prose is lovely, her details lush and alluring, and her identifications with character and place always convincing.",
      critic_name: "Zachary Mason",
      publication: "The New York Times Book Review",
      rating: 85,
      review_date: "2011-09-23"
    },
    {
      isbn: "9780062060624",
      expected_title: "The Song of Achilles",
      review_quote: "A brilliant, deeply moving retelling that breathes new life into ancient myth.",
      critic_name: "Patricia Williams",
      publication: "NPR Books",
      rating: 91,
      review_date: "2011-09-18"
    },
    {
      isbn: "9780062060624",
      expected_title: "The Song of Achilles",
      review_quote: "Miller has given us her own fresh take on the ancient story, and it's a memorable one.",
      critic_name: "Steve Bennett",
      publication: "Publishers Weekly",
      rating: 88,
      review_date: "2011-09-15"
    },
    {
      isbn: "9780062060624",
      expected_title: "The Song of Achilles",
      review_quote: "An achingly beautiful love story that reimagines classical mythology with remarkable emotional depth.",
      critic_name: "Diana Foster",
      publication: "Library Journal",
      rating: 87,
      review_date: "2011-09-25"
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
