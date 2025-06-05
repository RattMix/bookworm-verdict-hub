import { Star, Award, Users, BookOpen, Calendar, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useParams } from "react-router-dom";
import { useBooks } from "@/hooks/useBooks";
import { useCriticReviews } from "@/hooks/useCriticReviews";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { books, loading: booksLoading } = useBooks({ limit: 1000 });
  const book = books.find(b => b.id === id);
  const { reviews, loading: reviewsLoading, refetchCriticReviews } = useCriticReviews(id || '');

  // Improved function to trigger the ingestion with better error handling
  const handleIngestReviews = async () => {
    try {
      console.log('🚀 Starting critic review ingestion...');
      const { data, error } = await supabase.functions.invoke('ingest-critic-reviews');

      if (error) {
        console.error('❌ Ingestion error:', error.message || error);
        alert('Error ingesting critic reviews. Please try again.');
        return;
      }

      console.log('✅ Ingestion result:', data);

      // Use refetch instead of page reload
      if (refetchCriticReviews) {
        await refetchCriticReviews();
      } else {
        window.location.reload(); // fallback
      }
    } catch (err) {
      console.error('❌ Failed to call ingestion function:', err);
      alert('Unexpected error during review ingestion.');
    }
  };

  // Debug logging
  useEffect(() => {
    console.log('BookDetail - Current book:', book);
    console.log('BookDetail - Reviews loading:', reviewsLoading);
    console.log('BookDetail - Reviews:', reviews);
    console.log('BookDetail - Book ID:', id);
  }, [book, reviews, reviewsLoading, id]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-800 border-emerald-300";
    if (score >= 60) return "bg-amber-100 text-amber-800 border-amber-300";
    return "bg-rose-100 text-rose-800 border-rose-300";
  };

  // Improved cover image handling for book detail page
  const getCoverImageUrl = () => {
    if (book?.isbn && book.isbn.trim()) {
      const cleanIsbn = book.isbn.replace(/[-\s]/g, '');
      const openLibraryUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
      console.log(`Book detail cover URL: ${openLibraryUrl}`);
      return openLibraryUrl;
    }
    return "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center";
  };

  const hasValidCriticScore = book?.calculated_critic_score !== null && (book?.critic_review_count || 0) >= 5;
  const displayScore = hasValidCriticScore ? book?.calculated_critic_score : null;

  if (booksLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
        <Navigation />
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-gray-600">Loading book details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
        <Navigation />
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-gray-600">Book not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        {/* Debug button - remove after testing */}
        <div className="mb-4">
          <Button onClick={handleIngestReviews} variant="outline" className="mb-4">
            Load Critic Reviews (Debug)
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Book Cover and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-slate-200">
              <img 
                src={getCoverImageUrl()} 
                alt={book.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
                onError={(e) => {
                  console.log(`Book detail image failed: ${e.currentTarget.src}`);
                  e.currentTarget.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center";
                }}
                onLoad={() => console.log(`Book detail cover loaded: ${getCoverImageUrl()}`)}
              />
              
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2 font-serif">{book.title}</h1>
                  <p className="text-lg text-gray-600">by {book.author}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {book.genre?.map((g) => (
                    <Badge key={g} variant="outline" className="text-slate-600 border-slate-400">
                      {g}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {book.published_date ? new Date(book.published_date).getFullYear() : 'TBD'}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {book.page_count || 'TBD'} pages
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1 bg-slate-800 hover:bg-slate-700">
                    Write a Review
                  </Button>
                  <Button variant="outline" size="icon" className="border-slate-300">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-slate-300">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Ad Slot - Sidebar */}
            <div className="ad-slot-sidebar" style={{minHeight: '600px', width: '100%', background: '#f5f5f5', marginTop: '2rem', textAlign: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '12px'}}>
              [Ad Slot: Sidebar]
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Scores */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Award className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold">Critic Score</h3>
                  </div>
                  {hasValidCriticScore && displayScore ? (
                    <>
                      <div className={`inline-flex items-center px-6 py-3 rounded-full text-3xl font-bold border-2 ${getScoreColor(displayScore)}`}>
                        {Math.round(displayScore)}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Based on {book.critic_review_count} professional reviews
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-center">
                        <div className="text-gray-500 mb-2">
                          {book.critic_review_count && book.critic_review_count > 0 
                            ? `${book.critic_review_count} review${book.critic_review_count !== 1 ? 's' : ''} • Score coming soon`
                            : 'Coming Soon'
                          }
                        </div>
                        <p className="text-sm text-gray-600">
                          Critic score available with 5+ reviews
                        </p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Users className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold">Reader Score</h3>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500 mb-2">Coming Soon</div>
                    <p className="text-sm text-gray-600">
                      Reader reviews will be available soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Plot Summary */}
            {book.summary && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Plot Summary</h2>
                <p className="text-gray-700 leading-relaxed">{book.summary}</p>
              </div>
            )}

            {/* Ad Slot - Inline */}
            <div className="ad-slot-inline" style={{minHeight: '250px', background: '#fafafa', margin: '2rem 0', textAlign: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px'}}>
              [Ad Slot: Inline]
            </div>
            
            {/* Professional Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Professional Reviews</h2>
              
              {/* Debug info */}
              <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
                <p>Debug: Reviews loading: {reviewsLoading.toString()}</p>
                <p>Debug: Reviews count: {reviews.length}</p>
                <p>Debug: Book ISBN: {book?.isbn}</p>
                <p>Debug: Book ID: {book?.id}</p>
              </div>

              {reviewsLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading critic reviews...</p>
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-l-4 border-blue-500 pl-6">
                      <p className="text-gray-700 text-lg mb-3 leading-relaxed">"{review.review_quote}"</p>
                      <div className="flex items-center gap-4">
                        {review.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-800">{review.rating}/100</span>
                          </div>
                        )}
                        <span className="font-semibold text-gray-800">{review.critic_name}</span>
                        <span className="text-gray-600">{review.publication}</span>
                        {review.review_url && (
                          <a 
                            href={review.review_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Read Full Review →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-4">No critic reviews available yet.</p>
                  <p className="text-gray-500 text-sm">Professional reviews will be added as they become available.</p>
                  <Button onClick={handleIngestReviews} variant="outline" className="mt-4">
                    Load Reviews Now
                  </Button>
                </div>
              )}
            </div>
            
            {/* Reader Reviews Section */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Reader Reviews</h2>
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">Reader reviews will be available soon.</p>
                <Button variant="outline" className="border-slate-300">
                  Be the First to Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
