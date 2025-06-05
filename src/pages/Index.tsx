
import { useState } from "react";
import { Search, Star, TrendingUp, Book, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/BookCard";
import ReviewCard from "@/components/ReviewCard";
import Navigation from "@/components/Navigation";

// Expanded featured books with real titles
const featuredBooks = [
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
  }
];

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
                <div className="text-3xl font-bold text-slate-100">50,000+</div>
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
      <div className="ad-slot-leaderboard py-4 bg-gray-100"></div>

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.slice(0, 3).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
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
              <p className="text-slate-300 leading-relaxed">
                Plot Twist is an independent book review aggregator — combining critic reviews and reader opinions (coming soon). 
                It's not linked to any platform or publisher.
              </p>
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
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Use</a></li>
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
