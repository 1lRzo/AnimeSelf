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

export interface StoryPart {
  id: string;
  content: string;
  isAdult?: boolean;
  actNumber?: number;
}

// Lista de modelos gratuitos por provedor
export const FREE_MODELS = {
  ollama: [
    'llama2',
    'mistral',
    'phi',
    'gemma',
    'llama2:7b',
    'mistral:7b',
    'phi:latest',
    'gemma:7b'
  ],
  lmstudio: [
    'lms-sk-X384l750YhR1-yOSnua9NnTM4_H8EU7dRo3WCMB7X0Q'
  ],
  huggingface: [
    'NousResearch/Llama-2-7b-chat',
    'mistralai/Mistral-7B-Instruct-v0.1',
    'microsoft/Phi-3-mini-4k-instruct',
    'google/gemma-7b-it'
  ],
  openrouter: [
    'llama-2-7b-chat',
    'phi-2'
  ]
};

// Todos os modelos gratuitos
export const ALL_FREE_MODELS = [
  ...FREE_MODELS.ollama,
  ...FREE_MODELS.lmstudio,
  ...FREE_MODELS.huggingface,
  ...FREE_MODELS.openrouter
];

export type ModelType = typeof ALL_FREE_MODELS[number] | string;

export type StoryMode = 'original' | 'comedy' | 'adult';

export interface StoryRequest {
  anime: Anime;
  protagonists: Protagonist[];
  mode: StoryMode;
  model: ModelType;
  includeActs?: boolean;
  previousParts?: StoryPart[];
  continueStory?: boolean;
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
