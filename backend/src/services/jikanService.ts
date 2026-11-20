import axios from 'axios';
import { Anime, JikanAnimeResponse, SearchParams } from '../types';
import { CONFIG } from '../config';

const JIKAN_API = CONFIG.jikanApiUrl;

export const searchAnime = async (params: SearchParams): Promise<{ data: Anime[]; hasNextPage: boolean }> => {
  try {
    const { q, page = 1, per_page = 20, rating } = params;
    
    let url = `${JIKAN_API}/anime?q=${encodeURIComponent(q)}&page=${page}&limit=${per_page}`;
    
    if (rating) {
      url += `&rating=${rating}`;
    }
    
    const response = await axios.get<JikanAnimeResponse>(url);
    
    return {
      data: response.data.data,
      hasNextPage: response.data.pagination.has_next_page
    };
  } catch (error) {
    console.error('Error searching anime:', error);
    throw new Error('Falha ao buscar animes. Tente novamente.');
  }
};

export const getAnimeById = async (id: number): Promise<Anime> => {
  try {
    const response = await axios.get<{ data: Anime }>(`${JIKAN_API}/anime/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error getting anime by ID:', error);
    throw new Error('Anime não encontrado.');
  }
};

export const getTopAnime = async (page: number = 1, rating?: string): Promise<{ data: Anime[]; hasNextPage: boolean }> => {
  try {
    let url = `${JIKAN_API}/top/anime?page=${page}&limit=20`;
    
    if (rating) {
      url += `&rating=${rating}`;
    }
    
    const response = await axios.get<JikanAnimeResponse>(url);
    
    return {
      data: response.data.data,
      hasNextPage: response.data.pagination.has_next_page
    };
  } catch (error) {
    console.error('Error getting top anime:', error);
    throw new Error('Falha ao buscar animes populares.');
  }
};

export const getAnimeRatings = async (): Promise<string[]> => {
  return ['g', 'pg', 'pg13', 'r', 'r18', 'rx'];
};
