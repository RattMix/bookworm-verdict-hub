
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Book {
  id: string;
  title: string;
  author: string;
  published_date: string | null;
  genre: string[];
  page_count: number | null;
  isbn: string | null;
  cover_url: string | null;
  summary: string | null;
  critic_score: number | null;
  critic_quotes: any;
  calculated_critic_score: number | null;
  critic_review_count: number | null;
  created_at: string;
}

interface UseBooksOptions {
  limit?: number;
  sortBy?: 'newest' | 'critic_score' | 'trending';
  genre?: string;
}

export const useBooks = (options: UseBooksOptions = {}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const { limit = 16, sortBy = 'newest', genre } = options;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching books with options:', { limit, sortBy, genre });
        
        let query = supabase
          .from('books')
          .select('id, title, author, published_date, genre, page_count, isbn, cover_url, summary, critic_score, critic_quotes, calculated_critic_score, critic_review_count, created_at', { count: 'exact' });

        // Filter by genre if specified
        if (genre && genre !== 'all') {
          query = query.contains('genre', [genre]);
        }

        // Apply sorting
        switch (sortBy) {
          case 'critic_score':
            query = query.order('calculated_critic_score', { ascending: false, nullsLast: true });
            break;
          case 'trending':
            // For trending, prioritize books with valid critic scores (5+ reviews)
            query = query
              .not('calculated_critic_score', 'is', null)
              .order('calculated_critic_score', { ascending: false });
            break;
          default:
            query = query.order('created_at', { ascending: false });
        }

        query = query.limit(limit);

        console.log('Executing Supabase query...');
        const { data, error, count } = await query;

        if (error) {
          console.error('Supabase query error:', error);
          throw error;
        }

        console.log('Raw data from Supabase:', data);
        console.log('Number of books fetched:', data?.length || 0);
        console.log('Total count from database:', count);
        console.log('Sample book data (first book):', data?.[0]);

        setTotalCount(count || 0);

        // Convert the data to match our Book interface
        const formattedBooks = (data || []).map(book => ({
          ...book,
          critic_quotes: Array.isArray(book.critic_quotes) ? book.critic_quotes : []
        }));

        console.log('Formatted books:', formattedBooks);
        console.log('Sample formatted book critic score:', formattedBooks[0]?.calculated_critic_score);
        setBooks(formattedBooks);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch books';
        console.error('Error in fetchBooks:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [limit, sortBy, genre]);

  return { books, loading, error, totalCount };
};
