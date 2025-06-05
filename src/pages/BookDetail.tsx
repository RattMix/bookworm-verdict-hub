import { Star, Award, Users, BookOpen, Calendar, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const bookData = {
  title: "Tomorrow, and Tomorrow, and Tomorrow",
  author: "Gabrielle Zevin",
  coverUrl: "https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg",
  isbn: "9780593321201",
  genre: ["Literary Fiction", "Contemporary"],
  publishYear: 2022,
  pageCount: 416,
  publisher: "Knopf",
  plotSummary: "On a bitter-cold day, in the December of his junior year at Harvard, Sam Masur exits a subway car and sees, amid the hordes of people waiting on the platform, Sadie Green. He calls her name. A decade-plus worth of history falls between them.",
  criticScore: 86,
  criticReviewCount: 34,
  criticConsensus: "Zevin crafts a sophisticated meditation on creativity, friendship, and digital culture that manages to be both intellectually ambitious and emotionally resonant."
};

const criticReviews = [
  {
    id: "1",
    excerpt: "A dazzling and intricately imagined novel that blurs the lines between reality and fantasy, work and play, commerce and art.",
    reviewer: "Dwight Garner",
    publication: "The New York Times",
    rating: 9
  },
  {
    id: "2", 
    excerpt: "Zevin has written a love letter to creative collaboration and the games that shape our lives, both digital and analog.",
    reviewer: "Heller McAlpin",
    publication: "NPR",
    rating: 8
  },
  {
    id: "3",
    excerpt: "A brilliant exploration of friendship, ambition, and the cost of creative success in the digital age.",
    reviewer: "Bethanne Patrick",
    publication: "The Washington Post",
    rating: 9
  }
];

const BookDetail = () => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-800 border-emerald-300";
    if (score >= 60) return "bg-amber-100 text-amber-800 border-amber-300";
    return "bg-rose-100 text-rose-800 border-rose-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Book Cover and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-slate-200">
              <img 
                src={bookData.coverUrl} 
                alt={bookData.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
              
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2 font-serif">{bookData.title}</h1>
                  <p className="text-lg text-gray-600">by {bookData.author}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {bookData.genre.map((g) => (
                    <Badge key={g} variant="outline" className="text-slate-600 border-slate-400">
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
                  <Button className="flex-1 bg-slate-800 hover:bg-slate-700">
                    Write a Review
                  </Button>
                  <Button variant="outline" size="icon" className="border-slate-300">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-slate-300">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Ad Slot - Sidebar */}
            <div className="ad-slot-sidebar" style={{minHeight: '600px', width: '100%', background: '#f5f5f5', marginTop: '2rem', textAlign: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '12px'}}>
              [Ad Slot: Sidebar]
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Scores */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
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
                  <div className="text-center">
                    <div className="text-gray-500 mb-2">Coming Soon</div>
                    <p className="text-sm text-gray-600">
                      Reader reviews will be available soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Plot Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Plot Summary</h2>
              <p className="text-gray-700 leading-relaxed">{bookData.plotSummary}</p>
            </div>
            
            {/* Critic Consensus */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Critic Consensus</h2>
              <p className="text-gray-700 leading-relaxed italic">{bookData.criticConsensus}</p>
            </div>

            {/* Ad Slot - Inline */}
            <div className="ad-slot-inline" style={{minHeight: '250px', background: '#fafafa', margin: '2rem 0', textAlign: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px'}}>
              [Ad Slot: Inline]
            </div>
            
            {/* Professional Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Professional Reviews</h2>
              <div className="space-y-6">
                {criticReviews.map((review) => (
                  <div key={review.id} className="border-l-4 border-blue-500 pl-6">
                    <p className="text-gray-700 text-lg mb-3 leading-relaxed">"{review.excerpt}"</p>
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
            
            {/* Reader Reviews Section */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Reader Reviews</h2>
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">Reader reviews will be available soon.</p>
                <Button variant="outline" className="border-slate-300">
                  Be the First to Review
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
