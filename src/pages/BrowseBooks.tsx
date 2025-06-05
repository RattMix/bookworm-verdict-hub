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
  { id: "Memoir", name: "Memoir & Biography", description: "Personal narratives and life stories of notable figures." },
  { id: "Science Fiction", name: "Science Fiction", description: "Speculative fiction exploring technology, space, and future societies." },
  { id: "Mystery", name: "Mystery", description: "Stories focused on solving crimes, puzzles, and unexplained events." }
];

const BrowseBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const { books, loading, error, totalCount } = useBooks({ 
    limit: 64, 
    sortBy: sortBy as 'newest' | 'critic_score' | 'trending',
    genre: selectedGenre 
  });

  const filteredBooks = books.filter(book => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre?.some(g => g.toLowerCase().includes(query))
    );
  });

  const addDebugInfo = (message: string) => {
    console.log(message);
    setDebugInfo(prev => prev + "\n" + new Date().toLocaleTimeString() + ": " + message);
  };

  // Enhanced function to trigger the book ingestion with detailed logging
  const handleIngestBooks = async () => {
    try {
      setIsLoadingBooks(true);
      setDebugInfo("");
      addDebugInfo('🚀 Starting book ingestion...');
      
      // First check current book count
      const { count: currentCount } = await supabase
        .from('books')
        .select('*', { count: 'exact', head: true });
      
      addDebugInfo(`📊 Current books in database: ${currentCount || 0}`);
      
      const { data, error } = await supabase.functions.invoke('ingest-books');

      if (error) {
        addDebugInfo(`❌ Book ingestion error: ${JSON.stringify(error)}`);
        alert(`Error ingesting books: ${error.message || JSON.stringify(error)}`);
        return;
      }

      addDebugInfo(`✅ Book ingestion result: ${JSON.stringify(data)}`);
      
      // Check new count
      const { count: newCount } = await supabase
        .from('books')
        .select('*', { count: 'exact', head: true });
      
      addDebugInfo(`📊 Books in database after ingestion: ${newCount || 0}`);
      
      alert(`Successfully added ${data?.booksAdded || 0} new 2025 books!`);
      
      // Force refresh the page data
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      addDebugInfo(`❌ Failed to call book ingestion function: ${JSON.stringify(err)}`);
      alert('Unexpected error during book ingestion.');
    } finally {
      setIsLoadingBooks(false);
    }
  };

  // Enhanced function to trigger the critic review ingestion with detailed logging
  const handleIngestReviews = async () => {
    try {
      setIsLoadingReviews(true);
      addDebugInfo('🚀 Starting critic review ingestion...');
      
      // Check current review count
      const { count: currentReviews } = await supabase
        .from('critic_reviews')
        .select('*', { count: 'exact', head: true });
      
      addDebugInfo(`📊 Current reviews in database: ${currentReviews || 0}`);
      
      const { data, error } = await supabase.functions.invoke('ingest-critic-reviews');

      if (error) {
        addDebugInfo(`❌ Review ingestion error: ${JSON.stringify(error)}`);
        alert(`Error ingesting critic reviews: ${error.message || JSON.stringify(error)}`);
        return;
      }

      addDebugInfo(`✅ Review ingestion result: ${JSON.stringify(data)}`);
      
      // Check new review count
      const { count: newReviews } = await supabase
        .from('critic_reviews')
        .select('*', { count: 'exact', head: true });
      
      addDebugInfo(`📊 Reviews in database after ingestion: ${newReviews || 0}`);
      
      alert(`Successfully added ${data?.reviewsAdded || 0} unique critic reviews for ${data?.booksProcessed || 0} books!`);
      
      // Force refresh the page data
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      addDebugInfo(`❌ Failed to call review ingestion function: ${JSON.stringify(err)}`);
      alert('Unexpected error during review ingestion.');
    } finally {
      setIsLoadingReviews(false);
    }
  };

  // Function to check database status
  const checkDatabaseStatus = async () => {
    try {
      addDebugInfo('🔍 Checking database status...');
      
      const { count: bookCount } = await supabase
        .from('books')
        .select('*', { count: 'exact', head: true });
      
      const { count: reviewCount } = await supabase
        .from('critic_reviews')
        .select('*', { count: 'exact', head: true });
      
      const { data: sampleBooks } = await supabase
        .from('books')
        .select('title, calculated_critic_score, critic_review_count')
        .limit(3);
      
      addDebugInfo(`📊 Database Status:
        - Books: ${bookCount || 0}
        - Reviews: ${reviewCount || 0}
        - Sample books: ${JSON.stringify(sampleBooks, null, 2)}`);
        
    } catch (err) {
      addDebugInfo(`❌ Database check failed: ${JSON.stringify(err)}`);
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
            Discover the most acclaimed books of 2025 with expert critic reviews
          </p>
        </div>

        {/* Enhanced debug buttons with status checking */}
        <div className="mb-8 flex gap-4 justify-center flex-wrap">
          <Button 
            onClick={handleIngestBooks} 
            variant="outline" 
            className="bg-blue-50 hover:bg-blue-100"
            disabled={isLoadingBooks}
          >
            {isLoadingBooks ? "Loading Books..." : "Load 50 Books (2025)"}
          </Button>
          <Button 
            onClick={handleIngestReviews} 
            variant="outline" 
            className="bg-green-50 hover:bg-green-100"
            disabled={isLoadingReviews}
          >
            {isLoadingReviews ? "Loading Reviews..." : "Load Unique Critic Reviews"}
          </Button>
          <Button 
            onClick={checkDatabaseStatus} 
            variant="outline" 
            className="bg-yellow-50 hover:bg-yellow-100"
          >
            Check Database Status
          </Button>
        </div>

        {/* Debug info display */}
        {debugInfo && (
          <div className="mb-8 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Information:</h3>
            <pre className="text-xs overflow-auto max-h-40 whitespace-pre-wrap">{debugInfo}</pre>
            <Button 
              onClick={() => setDebugInfo("")} 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              Clear Debug Info
            </Button>
          </div>
        )}

        {/* Updated catalogue explainer */}
        <div className="max-w-4xl mx-auto mb-8 bg-white rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">📚 Curated 2025 Collection</h3>
          <p className="text-slate-700 leading-relaxed">
            Welcome to our carefully curated collection of the <strong>50 most acclaimed books of 2025</strong>. 
            Each book features authentic critic reviews from major publications, accurate cover images, and comprehensive metadata. 
            Our goal is to expand this into the most trusted independent book review aggregator, covering millions of titles across all genres and years.
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
                <SelectItem value="newest">Latest 2025 Releases</SelectItem>
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
              "Loading 2025 books..."
            ) : (
              <>
                Showing {filteredBooks.length} of {totalCount} {totalCount === 1 ? 'book' : 'books'} from 2025
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
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading 2025 books...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : totalCount === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Ready to Load 2025 Collection</h3>
            <p className="text-gray-600 text-lg mb-6">Our curated collection of 50 acclaimed 2025 books is ready to be loaded.</p>
            <div className="space-y-4">
              <Button 
                onClick={handleIngestBooks}
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3"
                disabled={isLoadingBooks}
              >
                {isLoadingBooks ? "Loading..." : "Load 50 Books from 2025"}
              </Button>
              <p className="text-sm text-gray-500">
                This will load 50 popular books from 2025 with covers and metadata
              </p>
            </div>
          </div>
        ) : sortBy === 'trending' && books.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No trending books available yet.</p>
            <p className="text-gray-500 mb-4">Books need 5+ critic reviews to appear in trending. Load reviews to see trending books.</p>
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
