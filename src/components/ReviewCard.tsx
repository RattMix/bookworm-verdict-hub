
import { Star, Award, User } from "lucide-react";

interface Review {
  id: string;
  bookTitle: string;
  reviewer: string;
  rating: number;
  excerpt: string;
  type: "critic" | "user";
  publication?: string | null;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-slate-300"
        }`}
      />
    ));
  };

  const getReviewEmoji = (rating: number) => {
    if (rating >= 8) return "🔥";
    if (rating >= 6) return "👍";
    if (rating >= 4) return "📖";
    return "😐";
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-orange-100 p-6 hover:shadow-xl hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {review.type === "critic" ? (
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full shadow-lg">
              <Award className="h-5 w-5 text-white" />
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
          )}
          <div>
            <h4 className="font-bold text-lg text-gray-800">{review.bookTitle}</h4>
            <p className="text-sm font-medium">
              {review.type === "critic" ? (
                <span className="text-blue-600 flex items-center gap-1">
                  🎯 Professional Review
                </span>
              ) : (
                <span className="text-green-600 flex items-center gap-1">
                  💭 Reader Review
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getReviewEmoji(review.rating)}</span>
          <div className="flex items-center space-x-1">
            {renderStars(review.rating)}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
        <p className="text-gray-700 leading-relaxed italic">
          "{review.excerpt}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="font-bold text-gray-800 flex items-center gap-2">
            ✍️ {review.reviewer}
          </p>
          {review.publication && (
            <p className="text-sm text-gray-500 font-medium">
              📰 {review.publication}
            </p>
          )}
        </div>
        <button className="text-purple-600 text-sm font-bold hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-full transition-colors flex items-center gap-1">
          Read More 📖 →
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
