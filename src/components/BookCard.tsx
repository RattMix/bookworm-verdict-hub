
import { Star, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  critic_score: number | null;
  calculated_critic_score: number | null;
  critic_review_count: number | null;
  genre: string[];
  published_date: string | null;
  page_count: number | null;
  critic_quotes: any[];
  summary: string | null;
  isbn: string | null;
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

  // Use calculated_critic_score only if book has 5+ reviews
  const hasValidCriticScore = book.calculated_critic_score !== null && (book.critic_review_count || 0) >= 5;
  const displayScore = hasValidCriticScore ? book.calculated_critic_score : null;
  const reviewCount = book.critic_review_count || 0;
  const primaryGenre = book.genre?.[0] || 'Fiction';
  const year = formatYear(book.published_date);

  // Enhanced cover image URL generation with better ISBN handling
  const getCoverImageUrl = () => {
    // First try the stored cover_url
    if (book.cover_url && book.cover_url.trim()) {
      return book.cover_url;
    }
    
    // Then try ISBN-based sources with clean ISBN (no scientific notation)
    if (book.isbn && book.isbn.trim()) {
      const cleanIsbn = String(book.isbn).replace(/[-\s]/g, '');
      // Ensure ISBN is not in scientific notation
      if (cleanIsbn.length >= 10 && !cleanIsbn.includes('e') && !cleanIsbn.includes('E')) {
        return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
      }
    }
    
    // Fallback to book-themed placeholder
    return "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center";
  };

  const coverImageUrl = getCoverImageUrl();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    
    // First fallback: try Google Books if coming from Open Library
    if (target.src.includes('openlibrary') && book.isbn) {
      const cleanIsbn = String(book.isbn).replace(/[-\s]/g, '');
      if (cleanIsbn.length >= 10 && !cleanIsbn.includes('e') && !cleanIsbn.includes('E')) {
        target.src = `https://books.google.com/books/content?id=${cleanIsbn}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;
        return;
      }
    } 
    
    // Second fallback: try alternative Open Library format
    if (target.src.includes('google') && book.isbn) {
      const cleanIsbn = String(book.isbn).replace(/[-\s]/g, '');
      if (cleanIsbn.length >= 10 && !cleanIsbn.includes('e') && !cleanIsbn.includes('E')) {
        target.src = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`;
        return;
      }
    }
    
    // Final fallback: reliable book image
    target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center";
  };

  return (
    <Link to={`/book/${book.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 group cursor-pointer">
        <div className="relative">
          <img 
            src={coverImageUrl}
            alt={`Cover of ${book.title}`}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="absolute top-3 right-3">
            <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              {primaryGenre}
            </span>
          </div>
          {year && year >= 2020 && (
            <div className="absolute top-3 left-3">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                {year}
              </span>
            </div>
          )}
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
          
          {/* Enhanced summary display */}
          {book.summary && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {book.summary}
            </p>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-1.5 rounded-full">
                <Award className="h-4 w-4 text-blue-600" />
              </div>
              {hasValidCriticScore && displayScore ? (
                <>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getScoreColor(displayScore)}`}>
                    {Math.round(displayScore)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {reviewCount} critic{reviewCount !== 1 ? 's' : ''}
                  </span>
                </>
              ) : (
                <span className="text-sm text-gray-500 italic">
                  {reviewCount > 0 ? 
                    `${reviewCount} review${reviewCount !== 1 ? 's' : ''} • ${reviewCount < 5 ? 'Needs 5+ for score' : 'Score calculating...'}` : 
                    'No reviews yet'
                  }
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {book.isbn ? `ISBN: ${String(book.isbn).slice(0, 13)}${String(book.isbn).length > 13 ? '...' : ''}` : 'Classic literature'}
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
