
import { Star, Award, Users, BookOpen, Calendar, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ReviewCard from "@/components/ReviewCard";

const bookData = {
  title: "Tomorrow, and Tomorrow, and Tomorrow",
  author: "Gabrielle Zevin",
  coverUrl: "/placeholder.svg",
  genre: ["Literary Fiction", "Contemporary"],
  publishYear: 2022,
  pageCount: 416,
  publisher: "Knopf",
  isbn: "9780593321201",
  plotSummary: "A novel about art, time, identity, and the nature of reality, following friends Sam and Sadie as they design groundbreaking video games. Their creative partnership spans decades, exploring love, ambition, and the games we play with each other.",
  criticScore: 86,
  criticReviewCount: 34,
  readerScore: 8.4,
  readerReviewCount: 2923,
  criticConsensus: "Zevin crafts a sophisticated meditation on creativity, friendship, and digital culture that manages to be both intellectually ambitious and emotionally resonant. Critics praise its nuanced character development and thoughtful exploration of how art shapes our understanding of reality."
};

const criticReviews = [
  {
    id: "1",
    excerpt: "A dazzling and intricately imagined novel that blurs the lines between reality and fantasy, work and play, commerce and art...",
    reviewer: "Dwight Garner",
    publication: "The New York Times",
    rating: 9
  },
  {
    id: "2", 
    excerpt: "Zevin has written a love letter to creative collaboration and the games that shape our lives, both digital and analog...",
    reviewer: "Heller McAlpin",
    publication: "NPR",
    rating: 8
  },
  {
    id: "3",
    excerpt: "A brilliant exploration of friendship, ambition, and the cost of creative success in the digital age...",
    reviewer: "Bethanne Patrick",
    publication: "The Washington Post",
    rating: 9
  }
];

const readerReviews = [
  {
    id: "1",
    excerpt: "This book completely changed how I think about video games as an art form. Zevin's writing is beautiful and the characters feel incredibly real.",
    reviewer: "BookwormSarah",
    rating: 9,
    helpfulVotes: 47
  },
  {
    id: "2",
    excerpt: "A masterful story about friendship and creativity. The gaming elements are woven in perfectly without overwhelming the human story.",
    reviewer: "ReadingRainbow23",
    rating: 8,
    helpfulVotes: 32
  }
];

const BookDetail = () => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-800 border-emerald-300";
    if (score >= 60) return "bg-amber-100 text-amber-800 border-amber-300";
    return "bg-rose-100 text-rose-800 border-rose-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Book Cover and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <img 
                src={bookData.coverUrl} 
                alt={bookData.title}
                className="w-full h-96 object-cover rounded-xl mb-6"
              />
              
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{bookData.title}</h1>
                  <p className="text-lg text-gray-600">by {bookData.author}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {bookData.genre.map((g) => (
                    <Badge key={g} variant="outline" className="text-purple-600 border-purple-600">
                      {g}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {bookData.publishYear}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {bookData.pageCount} pages
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Write a Review ✍️
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scores */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Award className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold">Critic Score</h3>
                  </div>
                  <div className={`inline-flex items-center px-6 py-3 rounded-full text-3xl font-bold border-2 ${getScoreColor(bookData.criticScore)}`}>
                    {bookData.criticScore}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Based on {bookData.criticReviewCount} professional reviews
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Users className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold">Reader Score</h3>
                  </div>
                  <div className={`inline-flex items-center px-6 py-3 rounded-full text-3xl font-bold border-2 ${getScoreColor(bookData.readerScore * 10)}`}>
                    {bookData.readerScore}
                  </div>
                  <div className="flex justify-center mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(bookData.readerScore / 2) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Based on {bookData.readerReviewCount.toLocaleString()} reader reviews
                  </p>
                </div>
              </div>
            </div>
            
            {/* Plot Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Plot Summary</h2>
              <p className="text-gray-700 leading-relaxed">{bookData.plotSummary}</p>
            </div>
            
            {/* Critic Consensus */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Critic Consensus</h2>
              <p className="text-gray-700 leading-relaxed italic">{bookData.criticConsensus}</p>
            </div>
            
            {/* Professional Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Professional Reviews</h2>
              <div className="space-y-6">
                {criticReviews.map((review) => (
                  <div key={review.id} className="border-l-4 border-blue-500 pl-6">
                    <p className="text-gray-700 italic text-lg mb-3">"{review.excerpt}"</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating / 2 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-800">{review.reviewer}</span>
                      <span className="text-gray-600">{review.publication}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reader Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Reader Reviews</h2>
              <div className="space-y-6">
                {readerReviews.map((review) => (
                  <div key={review.id} className="border-l-4 border-green-500 pl-6">
                    <p className="text-gray-700 mb-3">"{review.excerpt}"</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating / 2 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-800">{review.reviewer}</span>
                      </div>
                      <span className="text-sm text-gray-600">{review.helpfulVotes} found helpful</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                  Read All {bookData.readerReviewCount.toLocaleString()} Reader Reviews
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
