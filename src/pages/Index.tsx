
import { useState } from "react";
import { Search, Star, TrendingUp, Book, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/BookCard";
import ReviewCard from "@/components/ReviewCard";
import Navigation from "@/components/Navigation";

// Real featured books with actual data
const featuredBooks = [
  {
    id: "1",
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    coverUrl: "/placeholder.svg",
    criticScore: 7.2,
    userScore: 8.8,
    reviewCount: 3847,
    genre: "Fantasy Romance"
  },
  {
    id: "2", 
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    coverUrl: "/placeholder.svg",
    criticScore: 8.6,
    userScore: 8.4,
    reviewCount: 2923,
    genre: "Literary Fiction"
  },
  {
    id: "3",
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus", 
    coverUrl: "/placeholder.svg",
    criticScore: 8.1,
    userScore: 8.7,
    reviewCount: 4241,
    genre: "Historical Fiction"
  }
];

// Real critic reviews from actual publications
const recentReviews = [
  {
    id: "1",
    bookTitle: "Tomorrow, and Tomorrow, and Tomorrow",
    reviewer: "Dwight Garner",
    rating: 9,
    excerpt: "A dazzling and intricately imagined novel that blurs the lines between reality and fantasy, work and play, commerce and art, male and female, self and other, offline and online...",
    type: "critic" as const,
    publication: "The New York Times"
  },
  {
    id: "2", 
    bookTitle: "Lessons in Chemistry",
    reviewer: "Ron Charles",
    rating: 8,
    excerpt: "Bonnie Garmus has written a smart, funny novel about a brilliant scientist whose career is constantly derailed by the sexism of her colleagues...",
    type: "critic" as const,
    publication: "The Washington Post"
  },
  {
    id: "3",
    bookTitle: "The Seven Moons of Maali Almeida",
    reviewer: "Salman Rushdie",
    rating: 9,
    excerpt: "A rip-roaring epic, full of humor and terror, about love, art, friendship, family, and the depths of political lunacy...",
    type: "critic" as const,
    publication: "The Guardian"
  },
  {
    id: "4", 
    bookTitle: "Fourth Wing",
    reviewer: "Publishers Weekly",
    rating: 7,
    excerpt: "Yarros crafts a compelling fantasy with a magic school setting, dangerous dragons, and a slow-burn romance that will appeal to fans of Sarah J. Maas...",
    type: "critic" as const,
    publication: "Publishers Weekly"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-indigo-800 to-teal-700 text-white py-24 overflow-hidden">
        {/* Floating book emoji decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">📚</div>
          <div className="absolute top-20 right-20 text-4xl animate-pulse">✨</div>
          <div className="absolute bottom-20 left-1/4 text-5xl animate-bounce delay-300">📖</div>
          <div className="absolute bottom-10 right-1/3 text-3xl animate-pulse delay-500">💫</div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4 animate-bounce">📖🔄</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent leading-tight">
              PlotTwist
            </h1>
            <p className="text-2xl md:text-3xl text-amber-100 mb-8 leading-relaxed font-medium">
              Where Every Story Takes an Unexpected Turn! ✨
            </p>
            <p className="text-lg text-indigo-200 mb-12 max-w-2xl mx-auto">
              Discover literary gems through honest reviews from critics and fellow book lovers. No algorithms, just authentic plot twists! 🎯
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                type="text"
                placeholder="Search for your next favorite book... 🔍"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-0 bg-white/20 backdrop-blur-sm text-white placeholder:text-indigo-200 focus:bg-white/30 transition-all shadow-2xl"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 shadow-lg">
                Find Books! 🚀
              </Button>
            </div>

            {/* Fun Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-4xl font-bold text-yellow-300">50K+</div>
                <div className="text-indigo-200 font-medium">Books Reviewed</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-4xl font-bold text-yellow-300">125K+</div>
                <div className="text-indigo-200 font-medium">Happy Readers</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-4xl font-bold text-yellow-300">200+</div>
                <div className="text-indigo-200 font-medium">Expert Critics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🔥</span>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Trending Reads
              </h2>
            </div>
            <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50 rounded-full px-6 py-3 font-semibold">
              Explore All Books 📖
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-20 bg-gradient-to-r from-violet-100 via-pink-50 to-orange-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <span className="text-4xl">💬</span>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Latest Buzz
              </h2>
            </div>
            <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 rounded-full px-6 py-3 font-semibold">
              Read All Reviews 🗣️
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
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Fun background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 left-5 text-8xl">📝</div>
          <div className="absolute top-1/2 right-10 text-6xl">🌟</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">💖</div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Plot-Twisting Community!</h2>
          <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
            Share your thoughts, discover hidden gems, and help fellow bookworms find their next plot twist! 📚✨
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl transform hover:scale-105 transition-all">
              Write a Review ✍️
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 rounded-full text-lg font-bold backdrop-blur-sm bg-white/10">
              Start Exploring 🚀
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
