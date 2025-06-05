
import { useState } from "react";
import { Search, Filter, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import BookCard from "@/components/BookCard";

const genres = [
  { id: "literary-fiction", name: "Literary Fiction", description: "Stories that explore the human condition with artistic language and complex characters." },
  { id: "mystery-thriller", name: "Mystery & Thriller", description: "Page-turners that keep you guessing. Cozy mysteries, psychological thrillers, and everything in between." },
  { id: "sci-fi-fantasy", name: "Science Fiction & Fantasy", description: "Imaginative worlds and speculative futures. Space operas, epic fantasy, dystopian fiction, and literary sci-fi." },
  { id: "historical-fiction", name: "Historical Fiction", description: "Past worlds brought to life through meticulous research and compelling storytelling." },
  { id: "memoir-biography", name: "Memoir & Biography", description: "Real lives, extraordinary stories. Personal memoirs and acclaimed biographies of fascinating figures." }
];

const sampleBooks = [
  {
    id: "1",
    title: "The Seven Moons of Maali Almeida",
    author: "Shehan Karunatilaka",
    coverUrl: "/placeholder.svg",
    criticScore: 8.9,
    userScore: 8.2,
    reviewCount: 1847,
    genre: "Literary Fiction"
  },
  {
    id: "2",
    title: "Babel",
    author: "R.F. Kuang",
    coverUrl: "/placeholder.svg",
    criticScore: 8.1,
    userScore: 8.9,
    reviewCount: 3241,
    genre: "Fantasy"
  },
  {
    id: "3",
    title: "The School for Good Mothers",
    author: "Jessamine Chan",
    coverUrl: "/placeholder.svg",
    criticScore: 7.8,
    userScore: 7.9,
    reviewCount: 1923,
    genre: "Dystopian Fiction"
  }
];

const BrowseBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("trending");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Browse Books 📚
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your next great read from our curated collection of reviewed books
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search books, authors, or genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
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

        {/* Genre Sections */}
        {genres.map((genre) => (
          <section key={genre.id} className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">{genre.name}</h2>
              <p className="text-gray-600 text-lg">{genre.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleBooks.map((book) => (
                <BookCard key={`${genre.id}-${book.id}`} book={book} />
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                View All {genre.name} Books →
              </Button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default BrowseBooks;
