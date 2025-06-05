
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
  critic_quotes: any; // Changed from any[] to any to match Supabase Json type
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

  const { limit = 16, sortBy = 'newest', genre } = options;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('books')
          .select('*');

        // Filter by genre if specified
        if (genre && genre !== 'all') {
          query = query.contains('genre', [genre]);
        }

        // Apply sorting
        switch (sortBy) {
          case 'critic_score':
            query = query.order('critic_score', { ascending: false });
            break;
          case 'trending':
            query = query.order('created_at', { ascending: false });
            break;
          default:
            query = query.order('created_at', { ascending: false });
        }

        query = query.limit(limit);

        const { data, error } = await query;

        if (error) throw error;

        // Convert the data to match our Book interface
        const formattedBooks = (data || []).map(book => ({
          ...book,
          critic_quotes: Array.isArray(book.critic_quotes) ? book.critic_quotes : []
        }));

        setBooks(formattedBooks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [limit, sortBy, genre]);

  return { books, loading, error };
};
