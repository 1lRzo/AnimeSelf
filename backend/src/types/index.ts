import { Request, Response } from 'express';

export interface Anime {
  id: number;
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  episodes: number;
  status: string;
  aired: {
    from: string;
    to: string;
  };
  season: string;
  year: number;
  synopsis: string;
  rating: string;
  genres: { name: string }[];
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
}

export interface JikanAnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}

export interface Protagonist {
  id: string;
  name: string;
  description: string;
  personality: string;
}

export type StoryMode = 'original' | 'comedy' | 'adult';
export type ModelType = 'mimo-v2.6-flash:free' | 'deepseek-v4.1-flash:free';

export interface StoryRequest {
  anime: Anime;
  protagonists: Protagonist[];
  mode: StoryMode;
  model: ModelType;
  includeActs?: boolean;
}

export interface StoryResponse {
  story: string;
  acts?: string[];
}

export interface SearchParams {
  q: string;
  page?: number;
  per_page?: number;
  rating?: string;
}

export interface AppRequest extends Request {
  body: StoryRequest;
}

export interface AppResponse extends Response {
  json: (data: any) => void;
}
