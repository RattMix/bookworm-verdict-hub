
import { useState } from "react";
import { Search, Star, TrendingUp, Book, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/BookCard";
import ReviewCard from "@/components/ReviewCard";
import Navigation from "@/components/Navigation";

// Mock data for featured books
const featuredBooks = [
  {
    id: "1",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    coverUrl: "/placeholder.svg",
    criticScore: 8.2,
    userScore: 9.1,
    reviewCount: 2847,
    genre: "Fiction"
  },
  {
    id: "2", 
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverUrl: "/placeholder.svg",
    criticScore: 7.8,
    userScore: 8.3,
    reviewCount: 1923,
    genre: "Science Fiction"
  },
  {
    id: "3",
    title: "The Midnight Library",
    author: "Matt Haig", 
    coverUrl: "/placeholder.svg",
    criticScore: 7.5,
    userScore: 8.7,
    reviewCount: 3241,
    genre: "Philosophy"
  }
];

// Mock recent reviews
const recentReviews = [
  {
    id: "1",
    bookTitle: "Tomorrow, and Tomorrow, and Tomorrow",
    reviewer: "Sarah Chen",
    rating: 9,
    excerpt: "A masterful exploration of friendship, creativity, and the digital age...",
    type: "critic",
    publication: "Literary Review"
  },
  {
    id: "2", 
    bookTitle: "The Atlas Six",
    reviewer: "BookLover92",
    rating: 7,
    excerpt: "Dark academia vibes with magical elements, though pacing feels uneven...",
    type: "user",
    publication: null
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-orange-200 bg-clip-text text-transparent">
              The Independent Voice in Book Reviews
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Discover your next great read through trusted critic reviews and authentic reader perspectives
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search books, authors, or reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-full border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-blue-200 focus:bg-white/20 transition-all"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6">
                Search
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Book className="h-12 w-12 text-orange-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-blue-200">Books Reviewed</div>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-orange-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">125K+</div>
                <div className="text-blue-200">Active Readers</div>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-orange-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-blue-200">Professional Critics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Featured Books</h2>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              Recent Reviews
            </h2>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              View All Reviews
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-slate-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Community</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Share your thoughts, discover new authors, and help fellow readers find their next favorite book
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              Write a Review
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
              Explore Books
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
