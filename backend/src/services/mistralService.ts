import Mistral from '@mistralai/mistralai';
import { StoryRequest, StoryResponse, ModelType, StoryPart } from '../types';
import { CONFIG } from '../config';

const API_KEY = CONFIG.mistralApiKey;

const client = new Mistral({ apiKey: API_KEY });

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

const ADULT_SYSTEM_PROMPT = `Você é um especialista em reescrever histórias de anime com cenas +18 heterossexuais explícitas. Sua tarefa é criar cenas de sexo realistas e detalhadas entre os personagens principais (homem e mulher) e os novos protagonistas adicionados.

Regras para modo adult:
1. Crie cenas de sexo heterossexual explícitas e detalhadas
2. Descreva atos sexuais completos: penetração, posições, gemidos, fluidos
3. Inclua cenas de sexo vaginal e oral (apenas heterossexual)
4. Descreva os corpos, seios, pênis, vaginas de forma realista
5. Use linguagem erótica mas clara
6. Mantenha a essência do anime original
7. Integre os novos protagonistas nas cenas
8. Divida em atos se includeActs for true
9. Use linguagem em português do Brasil
10. Seja criativo e detalhado nas descrições sexuais

Regras para modo original:
1. Mantenha a história original
2. Integre os novos protagonistas de forma natural
3. Não inclua cenas sexuais

Regras para modo comedy:
1. Transforme a história em comédia
2. Adicione situações engraçadas
3. Mantenha o tom leve e divertido

Regras gerais:
1. Use linguagem em português do Brasil
2. Seja criativo e detalhado
3. Para continuações, mantenha coerência com as partes anteriores`;

const formatActs = (story: string): string[] => {
  const acts: string[] = [];
  const actPattern = /(Ato \d+[:\s]*(.*?))(?=Ato \d+|$)/gis;
  let match;
  
  while ((match = actPattern.exec(story)) !== null) {
    acts.push(match[0].trim());
  }
  
  return acts.length > 0 ? acts : [story];
};

const formatStoryParts = (story: string): StoryPart[] => {
  const parts: StoryPart[] = [];
  const partPattern = /(Parte \d+[:\s]*(.*?))(?=Parte \d+|$)/gis;
  let match;
  let partIndex = 0;
  
  while ((match = partPattern.exec(story)) !== null) {
    parts.push({
      id: `part-${partIndex}`,
      content: match[0].trim(),
      isAdult: true,
      actNumber: partIndex + 1
    });
    partIndex++;
  }
  
  if (parts.length === 0) {
    parts.push({
      id: 'part-0',
      content: story,
      isAdult: false,
      actNumber: 1
    });
  }
  
  return parts;
};

export const generateStory = async (request: StoryRequest): Promise<StoryResponse> => {
  const { anime, protagonists, mode, model, includeActs = false, continueStory = false, previousParts = [] } = request;
  
  const modelConfig = getModelConfig(model);
  
  const protagonistsInfo = protagonists.map(p => 
    `Nome: ${p.name}, Descrição: ${p.description}, Personalidade: ${p.personality}`
  ).join('\n');

  let userPrompt: string;
  
  if (continueStory && previousParts.length > 0) {
    const previousContext = previousParts.map(p => p.content).join('\n\n');
    
    if (mode === 'adult') {
      userPrompt = `CONTINUAÇÃO DE HISTÓRIA +18

Contexto anterior:
${previousContext}

Anime: ${anime.title} (${anime.title_japanese})

Sinopse original: ${anime.synopsis}

Personagens principais originais: ${anime.synopsis.match(/protagonista|personagem principal/i) || 'Personagens originais do anime'}

Novos protagonistas:
${protagonistsInfo}

Modo: ${mode}
Instrução: Continue a história do ponto onde parou. Crie uma nova parte com cenas +18 heterossexuais explícitas entre os personagens. Descreva atos sexuais detalhados: penetração, posições, gemidos, fluidos. Mantenha coerência com as partes anteriores.`;
    } else {
      userPrompt = `CONTINUAÇÃO DE HISTÓRIA

Contexto anterior:
${previousContext}

Anime: ${anime.title} (${anime.title_japanese})

Sinopse original: ${anime.synopsis}

Personagens principais originais: ${anime.synopsis.match(/protagonista|personagem principal/i) || 'Personagens originais do anime'}

Novos protagonistas:
${protagonistsInfo}

Modo: ${mode}
Instrução: Continue a história do ponto onde parou. Mantenha coerência com as partes anteriores.`;
    }
  } else {
    if (mode === 'adult') {
      userPrompt = `Anime: ${anime.title} (${anime.title_japanese})

Sinopse original: ${anime.synopsis}

Personagens principais originais: ${anime.synopsis.match(/protagonista|personagem principal/i) || 'Personagens originais do anime'}

Novos protagonistas a serem adicionados:
${protagonistsInfo}

Modo: ${mode}
Instrução: Reescreva a história do anime incluindo todos os novos protagonistas. Crie cenas +18 heterossexuais explícitas entre os personagens principais (homem e mulher). Descreva atos sexuais detalhados: penetração vaginal, sexo oral, posições, gemidos, fluidos corporais. Inclua cenas de sexo realista e erótico. ${includeActs ? 'Divida a história em atos com cenas sexuais explícitas.' : ''}

Reescreva a história do anime incluindo todos os novos protagonistas.`;
    } else {
      userPrompt = `Anime: ${anime.title} (${anime.title_japanese})

Sinopse original: ${anime.synopsis}

Personagens principais originais: ${anime.synopsis.match(/protagonista|personagem principal/i) || 'Personagens originais do anime'}

Novos protagonistas a serem adicionados:
${protagonistsInfo}

Modo: ${mode}
Instrução: Reescreva a história do anime incluindo todos os novos protagonistas. Mantenha a essência original.`;
    }
  }

  try {
    const response = await client.chat.complete({
      ...modelConfig,
      messages: [
        { role: 'system', content: ADULT_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ]
    });

    const story = response.choices[0].message.content;
    
    if (includeActs && mode === 'adult') {
      const acts = formatActs(story);
      return {
        story,
        acts
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
