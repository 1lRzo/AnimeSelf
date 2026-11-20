import { useState, useCallback } from 'react';
import { Anime, SearchParams } from '../types';

export const useAnimeSearch = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const searchAnime = useCallback(async (params: SearchParams, reset: boolean = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const url = `/api/anime/search?q=${encodeURIComponent(params.q)}&page=${params.page}&per_page=${params.per_page || 10}${params.rating ? `&rating=${params.rating}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Falha ao buscar animes');
      }
      
      const data = await response.json();
      
      if (reset) {
        setAnimeList(data.data || []);
      } else {
        setAnimeList(prev => [...prev, ...(data.data || [])]);
      }
      setHasMore(data.hasNextPage || false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback((query: string, rating?: string) => {
    if (!isLoading && hasMore && query.trim()) {
      const nextPage = page + 1;
      setPage(nextPage);
      searchAnime({ q: query, page: nextPage, rating }, false);
    }
  }, [isLoading, hasMore, page, searchAnime]);

  const resetSearch = () => {
    setAnimeList([]);
    setPage(1);
    setHasMore(false);
    setError(null);
  };

  return {
    animeList,
    isLoading,
    hasMore,
    error,
    searchAnime,
    loadMore,
    resetSearch
  };
};
