
import { Star, Users, Award } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  criticScore: number;
  userScore: number;
  reviewCount: number;
  genre: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 6) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="relative">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-slate-800 text-white px-2 py-1 rounded-full text-xs font-medium">
            {book.genre}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-slate-600 mb-4">by {book.author}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Critic Score */}
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4 text-slate-500" />
              <span className={`px-2 py-1 rounded-md text-sm font-medium border ${getScoreColor(book.criticScore)}`}>
                {book.criticScore}
              </span>
            </div>
            
            {/* User Score */}
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-slate-500" />
              <span className={`px-2 py-1 rounded-md text-sm font-medium border ${getScoreColor(book.userScore)}`}>
                {book.userScore}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{book.reviewCount.toLocaleString()} reviews</span>
          </div>
          <span className="text-blue-600 font-medium hover:text-blue-700">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
