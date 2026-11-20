import { useState, useEffect, useCallback } from 'react';
import { Anime, SearchParams } from '../types';

interface AnimeSearchProps {
  onSelectAnime: (anime: Anime) => void;
  selectedAnime: Anime | null;
}

const AnimeSearch = ({ onSelectAnime, selectedAnime }: AnimeSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState<string>('');
  const [showAllRatings, setShowAllRatings] = useState(false);

  const fetchAnime = useCallback(async (params: SearchParams, reset: boolean = false) => {
    setIsLoading(true);
    try {
      const url = `/api/anime/search?q=${encodeURIComponent(params.q)}&page=${params.page}&per_page=10${params.rating ? `&rating=${params.rating}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (reset) {
        setAnimeList(data.data || []);
      } else {
        setAnimeList(prev => [...prev, ...(data.data || [])]);
      }
      setHasMore(data.hasNextPage || false);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
    if (query.trim()) {
      fetchAnime({ q: query, page: 1, rating: ratingFilter }, true);
    } else {
      setAnimeList([]);
    }
  }, [fetchAnime, ratingFilter]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore && searchQuery.trim()) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAnime({ q: searchQuery, page: nextPage, rating: ratingFilter });
    }
  };

  const handleRatingChange = (rating: string) => {
    setRatingFilter(rating);
    setPage(1);
    if (searchQuery.trim()) {
      fetchAnime({ q: searchQuery, page: 1, rating }, true);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const timer = setTimeout(() => {
        fetchAnime({ q: searchQuery, page: 1, rating: ratingFilter }, true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, fetchAnime, ratingFilter]);

  const getRatingColor = (rating: string) => {
    const ratingColors: Record<string, string> = {
      'g': '#00ff88',
      'pg': '#00aa44',
      'pg13': '#ffaa00',
      'r': '#ff6600',
      'r18': '#ff4444',
      'rx': '#cc0000'
    };
    return ratingColors[rating.toLowerCase()] || '#666';
  };

  return (
    <div className="search-section">
      <h2>Buscar Anime</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Digite o nome do anime..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="search-filters">
        <select
          value={ratingFilter}
          onChange={(e) => handleRatingChange(e.target.value)}
          className="select-input"
        >
          <option value="">Todos</option>
          <option value="g">G - Todas as idades</option>
          <option value="pg">PG - Crianças</option>
          <option value="pg13">PG-13 - Adolescentes</option>
          <option value="r">R - 17+</option>
          <option value="r18">R18 - Adultos</option>
          <option value="rx">Rx - Hentai</option>
        </select>
        
        <button
          className="btn btn-secondary"
          onClick={() => setShowAllRatings(!showAllRatings)}
          style={{ fontSize: '0.8rem', padding: '8px 12px' }}
        >
          {showAllRatings ? 'Ocultar' : 'Mostrar'} Todos
        </button>
      </div>

      {isLoading && page === 1 && (
        <div className="loading" style={{ padding: '20px 0' }}>
          <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
        </div>
      )}

      <div className="anime-list">
        {animeList.map(anime => (
          <div
            key={anime.id}
            className={`anime-item ${selectedAnime?.id === anime.id ? 'selected' : ''}`}
            onClick={() => onSelectAnime(anime)}
          >
            <img 
              src={anime.images?.jpg?.small_image_url || '/placeholder.jpg'} 
              alt={anime.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.jpg';
              }}
            />
            <div className="anime-item-info">
              <h4>{anime.title}</h4>
              <p>{anime.title_english || anime.title_japanese}</p>
            </div>
            {anime.rating && (
              <span 
                className="anime-item-rating"
                style={{ backgroundColor: getRatingColor(anime.rating) }}
              >
                {anime.rating}
              </span>
            )}
          </div>
        ))}
        
        {hasMore && !isLoading && searchQuery.trim() && (
          <button
            className="btn btn-secondary"
            onClick={handleLoadMore}
            style={{ 
              width: '100%', 
              padding: '10px',
              marginTop: '10px'
            }}
          >
            Carregar mais...
          </button>
        )}
        
        {isLoading && page > 1 && (
          <div className="loading" style={{ padding: '10px 0' }}>
            <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
          </div>
        )}
      </div>

      {selectedAnime && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '4px',
          border: '1px solid var(--border)'
        }}>
          <strong>Selecionado:</strong> {selectedAnime.title}
        </div>
      )}
    </div>
  );
};

export default AnimeSearch;
