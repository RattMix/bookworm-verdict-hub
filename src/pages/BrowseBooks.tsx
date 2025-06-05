
import { useState } from "react";
import { Search, Filter, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import BookCard from "@/components/BookCard";
import { useBooks } from "@/hooks/useBooks";
import { supabase } from "@/integrations/supabase/client";

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

  const { books, loading, error, totalCount } = useBooks({ 
    limit: 64, 
    sortBy: sortBy as 'newest' | 'critic_score' | 'trending',
    genre: selectedGenre 
  });

  console.log('Books data in BrowseBooks:', books);
  console.log('Loading state:', loading);
  console.log('Error state:', error);
  console.log('Total books in database:', totalCount);

  const filteredBooks = books.filter(book => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre?.some(g => g.toLowerCase().includes(query))
    );
  });

  // Improved function to trigger the book ingestion
  const handleIngestBooks = async () => {
    try {
      console.log('🚀 Starting book ingestion...');
      const { data, error } = await supabase.functions.invoke('ingest-books');

      if (error) {
        console.error('❌ Book ingestion error:', error.message || error);
        alert('Error ingesting books. Please try again.');
        return;
      }

      console.log('✅ Book ingestion result:', data);
      alert(`Successfully added ${data.booksAdded} new books!`);
      window.location.reload();
    } catch (err) {
      console.error('❌ Failed to call book ingestion function:', err);
      alert('Unexpected error during book ingestion.');
    }
  };

  // Improved function to trigger the critic review ingestion
  const handleIngestReviews = async () => {
    try {
      console.log('🚀 Starting critic review ingestion...');
      const { data, error } = await supabase.functions.invoke('ingest-critic-reviews');

      if (error) {
        console.error('❌ Review ingestion error:', error.message || error);
        alert('Error ingesting critic reviews. Please try again.');
        return;
      }

      console.log('✅ Review ingestion result:', data);
      alert(`Successfully added ${data.reviewsAdded} critic reviews!`);
      window.location.reload();
    } catch (err) {
      console.error('❌ Failed to call review ingestion function:', err);
      alert('Unexpected error during review ingestion.');
    }
  };

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

        {/* Debug buttons - remove after setup */}
        <div className="mb-8 flex gap-4 justify-center">
          <Button onClick={handleIngestBooks} variant="outline" className="bg-blue-50">
            Load 50 Books (Debug)
          </Button>
          <Button onClick={handleIngestReviews} variant="outline" className="bg-green-50">
            Load Critic Reviews (Debug)
          </Button>
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
                <SelectItem value="trending">Trending (5+ Reviews)</SelectItem>
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
                Showing {filteredBooks.length} of {totalCount} {totalCount === 1 ? 'book' : 'books'}
                {selectedGenre !== "all" && ` in ${genres.find(g => g.id === selectedGenre)?.name}`}
                {sortBy === 'trending' && filteredBooks.length > 0 && (
                  <span className="text-blue-600 font-medium"> • Books with 5+ critic reviews</span>
                )}
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
        ) : totalCount === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Our collection is growing!</p>
            <p className="text-gray-500 mb-4">Use the debug buttons above to load the initial book collection.</p>
          </div>
        ) : sortBy === 'trending' && books.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No trending books available yet.</p>
            <p className="text-gray-500 mb-4">Books need 5+ critic reviews to appear in trending. Reviews are being added regularly.</p>
            <Button 
              variant="outline" 
              onClick={() => setSortBy("newest")}
              className="mt-4"
            >
              View All Books Instead
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
                setSortBy("newest");
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
