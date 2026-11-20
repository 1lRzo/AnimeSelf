import Mistral from '@mistralai/mistralai';
import { StoryRequest, StoryResponse, ModelType } from '../types';
import { CONFIG } from '../config';

const API_KEY = CONFIG.mistralApiKey;

const client = new Mistral({ apiKey: API_KEY });

const SYSTEM_PROMPT = `Você é um especialista em reescrever histórias de anime. Sua tarefa é reformular a história para incluir os protagonistas fornecidos, mantendo a essência original do anime.

Regras:
1. Mantenha o estilo e tom da história original
2. Integre os novos protagonistas de forma natural
3. Para modo "original": mantenha o enredo principal, apenas adicione os personagens
4. Para modo "comedy": adicione elementos cômicos e situações engraçadas
5. Para modo "adult": inclua cenas +18 com descrições detalhadas (apenas se solicitado)
6. Se includeActs for true, divida a história em atos com cenas explícitas
7. Use linguagem em português do Brasil
8. Seja criativo e detalhado`;

const getModelConfig = (model: ModelType) => {
  switch (model) {
    case 'mimo-v2.6-flash:free':
      return { model: 'mimo-v2.6-flash:free', temperature: 0.7 };
    case 'deepseek-v4.1-flash:free':
      return { model: 'deepseek-v4.1-flash:free', temperature: 0.8 };
    default:
      return { model: 'mimo-v2.6-flash:free', temperature: 0.7 };
  }
};

const formatActs = (story: string): string[] => {
  const acts: string[] = [];
  const actPattern = /(Ato \d+[:\s]*(.*?))(?=Ato \d+|$)/gis;
  let match;
  
  while ((match = actPattern.exec(story)) !== null) {
    acts.push(match[0].trim());
  }
  
  return acts.length > 0 ? acts : [story];
};

export const generateStory = async (request: StoryRequest): Promise<StoryResponse> => {
  const { anime, protagonists, mode, model, includeActs = false } = request;
  
  const modelConfig = getModelConfig(model);
  
  const protagonistsInfo = protagonists.map(p => 
    `Nome: ${p.name}, Descrição: ${p.description}, Personalidade: ${p.personality}`
  ).join('\n');

  const modeInstruction = {
    original: 'Mantenha a história original, apenas adicione os novos protagonistas de forma natural.',
    comedy: 'Transforme a história em uma comédia, adicione situações engraçadas e diálogos cômicos.',
    adult: includeActs 
      ? 'Reescreva a história com cenas +18 explícitas. Divida em atos com descrições detalhadas das cenas.'
      : 'Reescreva a história com elementos +18, mas sem dividir em atos.'
  }[mode];

  const userPrompt = `Anime: ${anime.title} (${anime.title_japanese})

Sinopse original: ${anime.synopsis}

Personagens principais originais: ${anime.synopsis.match(/protagonista|personagem principal/i) || 'Personagens originais do anime'}

Novos protagonistas a serem adicionados:
${protagonistsInfo}

Modo: ${mode}
Instrução: ${modeInstruction}

${includeActs ? 'Divida a história em atos com cenas explícitas.' : ''}

Reescreva a história do anime incluindo todos os novos protagonistas.`;

  try {
    const response = await client.chat.complete({
      ...modelConfig,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ]
    });

    const story = response.choices[0].message.content;
    
    if (includeActs && mode === 'adult') {
      return {
        story,
        acts: formatActs(story)
      };
    }

    return { story };
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error('Falha ao gerar a história. Tente novamente.');
  }
};

export const listModels = async (): Promise<ModelType[]> => {
  return CONFIG.defaultModels as ModelType[];
};
