
import { useState } from "react";
import { Star, Book, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const WriteReview = () => {
  const [selectedBook, setSelectedBook] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [hasSpoilers, setHasSpoilers] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getRatingDescription = (rating: number) => {
    if (rating >= 9) return "Outstanding";
    if (rating >= 8) return "Excellent";
    if (rating >= 7) return "Very Good";
    if (rating >= 6) return "Good";
    if (rating >= 5) return "Average";
    if (rating >= 4) return "Below Average";
    if (rating >= 3) return "Poor";
    if (rating >= 2) return "Very Poor";
    if (rating >= 1) return "Terrible";
    return "";
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <Navigation />
        
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Review Submitted! ✨
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Thanks for sharing your perspective! Your review will appear on the book page 
                within 24 hours after moderation.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Write Another Review
                </Button>
                <Button variant="outline">
                  Browse Books
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Add Your Perspective ✍️
            </h1>
            <p className="text-xl text-gray-600">
              Share your honest opinion and help fellow readers discover great books
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Book Search */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Which book are you reviewing? 📚
              </label>
              <div className="relative">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for a book title or author..."
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  className="pl-10 text-lg py-3"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Can't find your book? We'll add it to our database when you submit your review.
              </p>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Your Rating ⭐
              </label>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: 10 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i + 1)}
                      className={`w-8 h-8 rounded-full border-2 font-bold transition-colors ${
                        i < rating 
                          ? "bg-yellow-400 border-yellow-400 text-white" 
                          : "border-gray-300 text-gray-400 hover:border-yellow-400"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {getRatingDescription(rating)}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs text-gray-500">
                <span>1-2: Poor</span>
                <span>3-4: Below Average</span>
                <span>5-6: Average</span>
                <span>7-8: Good</span>
                <span>9-10: Excellent</span>
              </div>
            </div>

            {/* Review Title */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Review Title (Optional)
              </label>
              <Input
                type="text"
                placeholder="Sum up your thoughts in a few words..."
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                maxLength={60}
                className="text-lg py-3"
              />
              <p className="text-sm text-gray-500 mt-2">
                {reviewTitle.length}/60 characters
              </p>
            </div>

            {/* Review Text */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Your Review 📝
              </label>
              <Textarea
                placeholder="Share your thoughts about this book. What did you love or dislike? Who would you recommend it to? Keep it honest and helpful for other readers..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="min-h-[200px] text-lg leading-relaxed"
                maxLength={500}
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  {reviewText.length}/500 words (minimum 50 characters)
                </p>
                {reviewText.length >= 50 && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    ✓ Ready to submit
                  </Badge>
                )}
              </div>
            </div>

            {/* Spoiler Warning */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="spoilers"
                  checked={hasSpoilers}
                  onCheckedChange={(checked) => setHasSpoilers(checked as boolean)}
                />
                <div>
                  <label htmlFor="spoilers" className="text-lg font-semibold text-gray-800 cursor-pointer">
                    This review contains spoilers
                  </label>
                  <p className="text-gray-600 mt-1">
                    Check this if your review reveals major plot points beyond the first quarter of the book.
                  </p>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-blue-600 mt-1" />
                <h3 className="text-lg font-semibold text-gray-800">Review Guidelines</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  Be honest and share your genuine opinion
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  Focus on the book, not the author personally
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  Mark spoilers appropriately
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  Keep it respectful and constructive
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={!selectedBook || rating === 0 || reviewText.length < 50}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-12 py-4 text-lg font-semibold"
              >
                Submit Review 🚀
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
