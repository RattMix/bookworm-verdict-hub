
import { useState } from "react";
import { Search, Filter, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import BookCard from "@/components/BookCard";
import { useBooks } from "@/hooks/useBooks";

const genres = [
  { id: "Fantasy", name: "Fantasy", description: "Speculative fiction exploring magical and supernatural worlds." },
  { id: "Romance", name: "Romance", description: "Stories focused on love, relationships, and romantic connections." },
  { id: "Historical Fiction", name: "Historical Fiction", description: "Stories set in the past, bringing historical periods to life through fiction." },
  { id: "Thriller", name: "Thriller", description: "Crime fiction, psychological thrillers, and suspenseful narratives." },
  { id: "Literary Fiction", name: "Literary Fiction", description: "Contemporary and classic works that explore the human experience through sophisticated prose." },
  { id: "Memoir", name: "Memoir & Biography", description: "Personal narratives and life stories of notable figures." }
];

const BrowseBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { books, loading, error } = useBooks({ 
    limit: 32, 
    sortBy: sortBy as 'newest' | 'critic_score' | 'trending',
    genre: selectedGenre 
  });

  console.log('Books data in BrowseBooks:', books);
  console.log('Loading state:', loading);
  console.log('Error state:', error);

  const filteredBooks = books.filter(book => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre?.some(g => g.toLowerCase().includes(query))
    );
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

        {/* Catalogue Explainer */}
        <div className="max-w-4xl mx-auto mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Why only 2025 books?</h3>
          <p className="text-slate-700 leading-relaxed">
            Our goal is to build the most trusted, independent book review aggregator — with millions of titles across all genres. 
            To keep things fast and focused while we scale, we're currently prioritising books published in <strong>2025</strong> across key genres. 
            More books (and more years!) are coming soon.
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
                <SelectItem value="newest">Newest Releases</SelectItem>
                <SelectItem value="critic_score">Highest Critic Score</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-gray-600">
            {loading ? (
              "Loading books..."
            ) : (
              <>
                Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
                {selectedGenre !== "all" && ` in ${genres.find(g => g.id === selectedGenre)?.name}`}
              </>
            )}
          </p>
        </div>

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">Error loading books: {error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Loading books...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No books available yet.</p>
            <p className="text-gray-500 mb-4">Books will appear here once the ingestion process runs.</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
            >
              Refresh Page
            </Button>
          </div>
        ) : (
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
