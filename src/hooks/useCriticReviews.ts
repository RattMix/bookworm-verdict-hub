
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CriticReview {
  id: string;
  book_id: string;
  isbn: string | null;
  review_quote: string;
  critic_name: string;
  publication: string;
  review_url: string | null;
  rating: number | null;
  review_date: string | null;
  created_at: string;
  updated_at: string;
}

export const useCriticReviews = (bookId: string) => {
  const [reviews, setReviews] = useState<CriticReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching critic reviews for book:', bookId);
        
        const { data, error } = await supabase
          .from('critic_reviews')
          .select('*')
          .eq('book_id', bookId)
          .order('rating', { ascending: false });

        if (error) {
          console.error('Error fetching critic reviews:', error);
          throw error;
        }

        console.log('Critic reviews fetched:', data);
        setReviews(data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch critic reviews';
        console.error('Error in useCriticReviews:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchReviews();
    }
  }, [bookId]);

  return { reviews, loading, error };
};
