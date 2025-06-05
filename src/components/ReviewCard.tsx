
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
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {review.type === "critic" ? (
            <div className="bg-blue-100 p-2 rounded-full">
              <Award className="h-5 w-5 text-blue-600" />
            </div>
          ) : (
            <div className="bg-green-100 p-2 rounded-full">
              <User className="h-5 w-5 text-green-600" />
            </div>
          )}
          <div>
            <h4 className="font-semibold text-slate-800">{review.bookTitle}</h4>
            <p className="text-sm text-slate-600">
              {review.type === "critic" ? "Professional Review" : "Reader Review"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {renderStars(review.rating)}
        </div>
      </div>

      <p className="text-slate-700 mb-4 leading-relaxed">"{review.excerpt}"</p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div>
          <p className="font-medium text-slate-800">{review.reviewer}</p>
          {review.publication && (
            <p className="text-sm text-slate-500">{review.publication}</p>
          )}
        </div>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          Read Full Review →
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
