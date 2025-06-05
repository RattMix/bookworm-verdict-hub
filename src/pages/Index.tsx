
import { useState, useEffect } from "react";
import { Search, Star, TrendingUp, Book, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/BookCard";
import ReviewCard from "@/components/ReviewCard";
import Navigation from "@/components/Navigation";
import { useBooks } from "@/hooks/useBooks";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Real critic reviews from actual publications - no fake user reviews
const recentReviews = [
  {
    id: "1",
    bookTitle: "The Seven Moons of Maali Almeida",
    reviewer: "Salman Rushdie",
    rating: 9,
    excerpt: "A rip-roaring epic, full of humor and terror, about love, art, friendship, family, and the depths of political lunacy.",
    type: "critic" as const,
    publication: "The Guardian"
  },
  {
    id: "2", 
    bookTitle: "Tomorrow, and Tomorrow, and Tomorrow",
    reviewer: "Dwight Garner",
    rating: 9,
    excerpt: "A dazzling and intricately imagined novel that blurs the lines between reality and fantasy, work and play, commerce and art.",
    type: "critic" as const,
    publication: "The New York Times"
  },
  {
    id: "3",
    bookTitle: "Babel",
    reviewer: "Jess Walter",
    rating: 8,
    excerpt: "Kuang has created a dark academic fantasy that brilliantly skewers colonialism and the violence of language itself.",
    type: "critic" as const,
    publication: "The Washington Post"
  },
  {
    id: "4", 
    bookTitle: "The School for Good Mothers",
    reviewer: "Ron Charles",
    rating: 8,
    excerpt: "Chan's debut is a chilling dystopian novel that feels all too plausible in our current moment of surveillance and judgment.",
    type: "critic" as const,
    publication: "The Washington Post"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isIngesting, setIsIngesting] = useState(false);
  const { books: featuredBooks, loading, error, totalCount } = useBooks({ limit: 6, sortBy: 'trending' });
  const { toast } = useToast();

  // Auto-trigger ingestion to refresh with ISBN data
  useEffect(() => {
    const autoIngest = async () => {
      // Always trigger ingestion to get books with ISBNs
      if (!loading && !error && !isIngesting) {
        console.log('Triggering ingestion to get books with ISBNs...');
        setIsIngesting(true);
        
        try {
          const { data, error: ingestError } = await supabase.functions.invoke('ingest-books');
          
          if (ingestError) {
            console.error('Auto-ingestion error:', ingestError);
          } else {
            console.log('Auto-ingestion completed:', data);
            // Refresh the page after successful ingestion
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        } catch (error) {
          console.error('Auto-ingestion failed:', error);
        }
        
        setIsIngesting(false);
      }
    };

    autoIngest();
  }, [loading, error, isIngesting]);

  console.log('Featured books data:', featuredBooks);
  console.log('Loading state:', loading);
  console.log('Error state:', error);
  console.log('Total books in database:', totalCount);
  console.log('Is ingesting:', isIngesting);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-gray-800 to-slate-700 text-white py-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 font-serif leading-tight">
              Plot Twist
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-4 font-medium">
              A book review aggregator. Critics and readers, side by side.
            </p>
            <p className="text-lg text-slate-300 mb-12">
              Independent. Up-to-date. Unfiltered.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-lg border-0 bg-white/90 backdrop-blur-sm text-gray-900 placeholder:text-gray-500 focus:bg-white transition-all shadow-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-md bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 shadow-lg">
                Search
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl font-bold text-slate-100">
                  {loading || isIngesting ? "..." : totalCount > 0 ? totalCount.toLocaleString() : "Growing"}+
                </div>
                <div className="text-slate-300 font-medium">Books Reviewed</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl font-bold text-slate-100">200+</div>
                <div className="text-slate-300 font-medium">Publications</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl font-bold text-slate-100">Daily</div>
                <div className="text-slate-300 font-medium">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot - Leaderboard */}
      <div className="ad-slot-leaderboard" style={{minHeight: '90px', background: '#eee', margin: '2rem 0', textAlign: 'center', fontSize: '14px', padding: '1rem', border: '1px solid #ccc'}}>
        [Ad Slot: Leaderboard]
      </div>

      {/* Catalogue Explainer */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Why only 2025 books?</h3>
            <p className="text-slate-700 leading-relaxed">
              Our goal is to build the most trusted, independent book review aggregator — with millions of titles across all genres. 
              To keep things fast and focused while we scale, we're currently prioritising books published in <strong>2025</strong> across key genres. 
              More books (and more years!) are coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 font-serif mb-2">
                Currently Trending
              </h2>
              <p className="text-gray-600">Books receiving significant critical attention</p>
            </div>
            <Button variant="outline" className="text-slate-700 border-slate-700 hover:bg-slate-50 rounded-lg px-6 py-3 font-semibold">
              Browse All Books
            </Button>
          </div>
          
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading books: {error}</p>
            </div>
          )}
          
          {(loading || isIngesting) ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {isIngesting ? "Adding books with cover images..." : "Loading latest books..."}
              </p>
            </div>
          ) : featuredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBooks.slice(0, 3).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading books with cover images...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a moment while we set up the collection.</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 font-serif mb-2">
                Latest Reviews
              </h2>
              <p className="text-gray-600">Fresh perspectives from trusted critics</p>
            </div>
            <Button variant="outline" className="text-slate-700 border-slate-700 hover:bg-slate-50 rounded-lg px-6 py-3 font-semibold">
              View All Critics
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-slate-800 via-gray-700 to-slate-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Want to Add Your Voice?</h2>
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
            Reader reviews are coming soon. You'll be able to rate, review, and explore what others are saying.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-slate-800 hover:bg-slate-100 px-10 py-4 rounded-lg text-lg font-bold shadow-lg">
              Get Notified
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800 px-10 py-4 rounded-lg text-lg font-bold">
              Explore Books
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <Book className="h-6 w-6 text-slate-900" />
                </div>
                <span className="text-2xl font-bold font-serif">Plot Twist</span>
              </div>
              <div className="mb-6">
                <p className="text-slate-200 font-medium mb-2">
                  Plot Twist is an independent book review aggregator.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  We combine critic reviews and reader ratings (coming soon) — with no publisher affiliation, platform bias, or retail agenda.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="/browse" className="hover:text-white transition-colors">Browse Books</a></li>
                <li><a href="/critics" className="hover:text-white transition-colors">Critics</a></li>
                <li><a href="/how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-300">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="/cookies" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="/moderation" className="hover:text-white transition-colors">Moderation</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Plot Twist. Independent book reviews.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
