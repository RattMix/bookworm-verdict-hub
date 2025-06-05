
import { useState } from "react";
import { Search, Filter, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import BookCard from "@/components/BookCard";

const genres = [
  { id: "literary-fiction", name: "Literary Fiction", description: "Contemporary and classic works that explore the human experience through sophisticated prose." },
  { id: "mystery-thriller", name: "Mystery & Thriller", description: "Crime fiction, psychological thrillers, and suspenseful narratives." },
  { id: "sci-fi-fantasy", name: "Science Fiction & Fantasy", description: "Speculative fiction exploring imagined worlds and future possibilities." },
  { id: "historical-fiction", name: "Historical Fiction", description: "Stories set in the past, bringing historical periods to life through fiction." },
  { id: "memoir-biography", name: "Memoir & Biography", description: "Personal narratives and life stories of notable figures." },
  { id: "dystopian", name: "Dystopian Fiction", description: "Speculative works exploring oppressive future societies." }
];

const allBooks = [
  {
    id: "1",
    title: "The Seven Moons of Maali Almeida",
    author: "Shehan Karunatilaka",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781635574968-L.jpg",
    criticScore: 89,
    userScore: 8.4,
    reviewCount: 1847,
    genre: "Literary Fiction",
    year: 2022,
    pages: 416
  },
  {
    id: "2", 
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg",
    criticScore: 86,
    userScore: 8.7,
    reviewCount: 2923,
    genre: "Literary Fiction",
    year: 2022,
    pages: 416
  },
  {
    id: "3",
    title: "The School for Good Mothers",
    author: "Jessamine Chan",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781501177736-L.jpg",
    criticScore: 78,
    userScore: 7.9,
    reviewCount: 1623,
    genre: "Dystopian Fiction",
    year: 2022,
    pages: 336
  },
  {
    id: "4",
    title: "Babel",
    author: "R.F. Kuang",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780063021426-L.jpg",
    criticScore: 81,
    userScore: 8.9,
    reviewCount: 3241,
    genre: "Fantasy",
    year: 2022,
    pages: 560
  },
  {
    id: "5",
    title: "The Atlas Six",
    author: "Olivie Blake",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781250854445-L.jpg",
    criticScore: 72,
    userScore: 8.1,
    reviewCount: 2156,
    genre: "Fantasy",
    year: 2022,
    pages: 464
  },
  {
    id: "6",
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780241988268-L.jpg",
    criticScore: 75,
    userScore: 8.3,
    reviewCount: 3847,
    genre: "Mystery",
    year: 2020,
    pages: 368
  },
  {
    id: "7",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780571364886-L.jpg",
    criticScore: 84,
    userScore: 7.8,
    reviewCount: 2456,
    genre: "Science Fiction",
    year: 2021,
    pages: 320
  },
  {
    id: "8",
    title: "The Invisible Bridge",
    author: "Julie Orringer",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780375414596-L.jpg",
    criticScore: 87,
    userScore: 8.5,
    reviewCount: 1987,
    genre: "Historical Fiction",
    year: 2010,
    pages: 624
  }
];

const BrowseBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("trending");

  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = searchQuery === "" || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === "all" || 
      book.genre.toLowerCase().includes(selectedGenre.replace("-", " "));
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-4 font-serif">
            Browse Books
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of reviewed titles across all genres
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by title, author, or genre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-slate-400"
                />
              </div>
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="border-slate-200 focus:border-slate-400">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-slate-200 focus:border-slate-400">
                <SortDesc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="critic-score">Highest Critic Score</SelectItem>
                <SelectItem value="reader-score">Highest Reader Score</SelectItem>
                <SelectItem value="most-reviewed">Most Reviewed</SelectItem>
                <SelectItem value="newest">Newest Releases</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
            {selectedGenre !== "all" && ` in ${genres.find(g => g.id === selectedGenre)?.name}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No books found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("all");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseBooks;
