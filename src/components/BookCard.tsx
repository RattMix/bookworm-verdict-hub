
import { Star, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  criticScore: number;
  userScore: number;
  reviewCount: number;
  genre: string;
  year?: number;
  pages?: number;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-700 bg-emerald-100 border-emerald-300";
    if (score >= 60) return "text-amber-700 bg-amber-100 border-amber-300";
    return "text-rose-700 bg-rose-100 border-rose-300";
  };

  return (
    <Link to={`/book/${book.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 group cursor-pointer">
        <div className="relative">
          <img 
            src={book.coverUrl} 
            alt={book.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          <div className="absolute top-3 right-3">
            <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              {book.genre}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-slate-600 transition-colors leading-tight font-serif">
            {book.title}
          </h3>
          <p className="text-gray-600 mb-1 font-medium">by {book.author}</p>
          {book.year && (
            <p className="text-gray-500 text-sm mb-4">{book.year} • {book.pages} pages</p>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* Critic Score */}
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-1.5 rounded-full">
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getScoreColor(book.criticScore)}`}>
                  {book.criticScore}
                </span>
              </div>
              
              {/* User Score */}
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getScoreColor(book.userScore * 10)}`}>
                  {book.userScore}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {book.reviewCount.toLocaleString()} reviews
            </span>
            <span className="text-slate-600 font-medium hover:text-slate-800 cursor-pointer">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
