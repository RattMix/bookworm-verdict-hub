
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
    if (score >= 8) return "text-emerald-700 bg-emerald-100 border-emerald-300";
    if (score >= 6) return "text-amber-700 bg-amber-100 border-amber-300";
    return "text-rose-700 bg-rose-100 border-rose-300";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 8) return "🔥";
    if (score >= 6) return "👍";
    return "📖";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 overflow-hidden hover:shadow-2xl hover:border-purple-300 transition-all duration-300 group cursor-pointer transform hover:-translate-y-2">
      <div className="relative">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {book.genre} ✨
          </span>
        </div>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-bold text-purple-600">
            {book.reviewCount.toLocaleString()} reviews 💬
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-purple-600 transition-colors leading-tight">
          {book.title}
        </h3>
        <p className="text-gray-600 mb-4 font-medium">by {book.author}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Critic Score */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full">
                <Award className="h-4 w-4 text-white" />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getScoreColor(book.criticScore)} flex items-center gap-1`}>
                {getScoreEmoji(book.criticScore)} {book.criticScore}
              </span>
            </div>
            
            {/* User Score */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-full">
                <Users className="h-4 w-4 text-white" />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getScoreColor(book.userScore)} flex items-center gap-1`}>
                {getScoreEmoji(book.userScore)} {book.userScore}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 font-medium">Highly rated!</span>
          </div>
          <span className="text-purple-600 font-bold hover:text-purple-700 cursor-pointer flex items-center gap-1">
            Read More 📚 →
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
