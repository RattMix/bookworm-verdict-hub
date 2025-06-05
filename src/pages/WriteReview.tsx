import { Book, Star, AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";

const WriteReview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-800 mb-4 font-serif">
              Write a Review
            </h1>
            <p className="text-xl text-gray-600">
              Share your perspective on the books that matter to you
            </p>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-amber-800 mb-2">Coming Soon</h3>
                <p className="text-amber-700 leading-relaxed">
                  Reader reviews are coming soon. You'll be able to rate, review, and explore what others are saying.
                </p>
              </div>
            </div>
          </div>

          {/* Preview Form */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Share Your Perspective</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="book-title" className="text-sm font-medium text-gray-700">
                    Book Title
                  </Label>
                  <Input
                    id="book-title"
                    type="text"
                    placeholder="Enter book title..."
                    className="mt-1 border-slate-200 focus:border-slate-400"
                    disabled
                  />
                </div>
                
                <div>
                  <Label htmlFor="author" className="text-sm font-medium text-gray-700">
                    Author
                  </Label>
                  <Input
                    id="author"
                    type="text"
                    placeholder="Enter author name..."
                    className="mt-1 border-slate-200 focus:border-slate-400"
                    disabled
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="rating" className="text-sm font-medium text-gray-700">
                  Your Rating (1-10)
                </Label>
                <Select disabled>
                  <SelectTrigger className="mt-1 border-slate-200">
                    <SelectValue placeholder="Select a rating..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1} {i + 1 === 10 ? '(Masterpiece)' : i + 1 >= 8 ? '(Excellent)' : i + 1 >= 6 ? '(Good)' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="review-title" className="text-sm font-medium text-gray-700">
                  Review Title
                </Label>
                <Input
                  id="review-title"
                  type="text"
                  placeholder="Give your review a title..."
                  className="mt-1 border-slate-200 focus:border-slate-400"
                  disabled
                />
              </div>

              <div>
                <Label htmlFor="review-body" className="text-sm font-medium text-gray-700">
                  Your Review
                </Label>
                <Textarea
                  id="review-body"
                  placeholder="Share your thoughts on this book..."
                  rows={6}
                  className="mt-1 border-slate-200 focus:border-slate-400"
                  disabled
                />
                <p className="text-sm text-gray-500 mt-2">
                  Recommended: 100-500 words
                </p>
              </div>

              <Button className="w-full bg-slate-800 hover:bg-slate-700 py-3" disabled>
                Submit Review
              </Button>
            </form>
          </div>

          {/* Review Guidelines */}
          <div className="bg-slate-800 text-white rounded-xl p-8 mt-8">
            <h3 className="text-2xl font-bold mb-6 font-serif">Review Guidelines</h3>
            <div className="space-y-4 text-slate-200">
              <div className="flex items-start gap-3">
                <Book className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Be Thoughtful</h4>
                  <p>Share specific insights about what worked or didn't work for you.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Avoid Spoilers</h4>
                  <p>Help other readers discover the book without revealing key plot points.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Stay Respectful</h4>
                  <p>Focus on the book itself rather than attacking other reviewers or the author personally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
