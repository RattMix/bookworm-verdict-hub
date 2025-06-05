
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

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Award className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-lg text-gray-800">{review.bookTitle}</h4>
            <p className="text-sm font-medium text-blue-600">
              Professional Review
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {renderStars(review.rating)}
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 mb-4">
        <p className="text-gray-700 leading-relaxed italic">
          "{review.excerpt}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="font-bold text-gray-800">
            {review.reviewer}
          </p>
          {review.publication && (
            <p className="text-sm text-gray-500 font-medium">
              {review.publication}
            </p>
          )}
        </div>
        <button className="text-slate-600 text-sm font-medium hover:text-slate-800 transition-colors">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
