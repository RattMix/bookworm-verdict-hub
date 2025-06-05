
import { Star, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  critic_score: number | null;
  genre: string[];
  published_date: string | null;
  page_count: number | null;
  critic_quotes: any[];
  summary: string | null;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const getScoreColor = (score: number | null) => {
    if (!score) return "text-gray-700 bg-gray-100 border-gray-300";
    if (score >= 80) return "text-emerald-700 bg-emerald-100 border-emerald-300";
    if (score >= 60) return "text-amber-700 bg-amber-100 border-amber-300";
    return "text-rose-700 bg-rose-100 border-rose-300";
  };

  const formatYear = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).getFullYear();
  };

  const reviewCount = Array.isArray(book.critic_quotes) ? book.critic_quotes.length : 0;
  const primaryGenre = book.genre?.[0] || 'Fiction';
  const year = formatYear(book.published_date);

  return (
    <Link to={`/book/${book.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 group cursor-pointer">
        <div className="relative">
          <img 
            src={book.cover_url || "/placeholder.svg"} 
            alt={book.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          <div className="absolute top-3 right-3">
            <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              {primaryGenre}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-slate-600 transition-colors leading-tight font-serif line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-600 mb-1 font-medium">by {book.author}</p>
          {year && (
            <p className="text-gray-500 text-sm mb-4">
              {year}{book.page_count ? ` • ${book.page_count} pages` : ''}
            </p>
          )}
          
          {/* Summary/Subject */}
          {book.summary && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {book.summary}
            </p>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-1.5 rounded-full">
                <Award className="h-4 w-4 text-blue-600" />
              </div>
              {book.critic_score ? (
                <>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getScoreColor(book.critic_score)}`}>
                    {book.critic_score}
                  </span>
                  <span className="text-sm text-gray-600">Critic Score</span>
                </>
              ) : (
                <span className="text-sm text-gray-500 italic">Critic reviews coming soon</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Critic reviews coming soon
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
