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

export interface Character {
  id: number;
  name: string;
  image_url: string;
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

// Lista de modelos gratuitos
export const FREE_MODELS = [
  'mimo-v2.6-flash:free',
  'deepseek-v4.1-flash:free',
  'lms-sk-X384l750YhR1-yOSnua9NnTM4_H8EU7dRo3WCMB7X0Q',
  'mistral-7b-instruct',
  'llama-2-7b-chat',
  'phi-2'
] as const;

export type ModelType = typeof FREE_MODELS[number] | string;

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
