import { useState, useCallback } from 'react';
import { StoryRequest, StoryResponse, StoryMode, ModelType } from '../types';

export const useStoryGeneration = () => {
  const [story, setStory] = useState<StoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStory = useCallback(async (request: StoryRequest) => {
    setIsLoading(true);
    setError(null);
    setStory(null);
    
    try {
      const response = await fetch('/api/story/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao gerar a história');
      }
      
      const data: StoryResponse = await response.json();
      setStory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearStory = () => {
    setStory(null);
    setError(null);
  };

  return {
    story,
    isLoading,
    error,
    generateStory,
    clearStory
  };
};
