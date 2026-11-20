import Mistral from '@mistralai/mistralai';
import { StoryRequest, StoryResponse, ModelType, StoryPart, FREE_MODELS } from '../types';
import { CONFIG } from '../config';

const API_KEY = CONFIG.mistralApiKey;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || '';

// Clientes para diferentes provedores
const mistralClient = new Mistral({ apiKey: API_KEY });

// Mapeamento de modelos para diferentes provedores
const MODEL_PROVIDERS: Record<string, string> = {
  // Mistral AI
  'mimo-v2.6-flash:free': 'mistral',
  'deepseek-v4.1-flash:free': 'mistral',
  'mistral-7b-instruct': 'mistral',
  
  // LM Studio (local)
  'lms-sk-X384l750YhR1-yOSnua9NnTM4_H8EU7dRo3WCMB7X0Q': 'lmstudio',
  
  // Hugging Face
  'NousResearch/Llama-2-7b-chat': 'huggingface',
  'mistralai/Mistral-7B-Instruct-v0.1': 'huggingface',
  'microsoft/Phi-3-mini-4k-instruct': 'huggingface',
  'google/gemma-7b-it': 'huggingface',
  
  // OpenRouter
  'llama-2-7b-chat': 'openrouter',
  'phi-2': 'openrouter'
};

const getModelConfig = (model: ModelType) => {
  const provider = MODEL_PROVIDERS[model] || 'mistral';
  
  switch (provider) {
    case 'mistral':
      return {
        model: model,
        temperature: model.includes('adult') || model.includes('deepseek') ? 0.8 : 0.7
      };
    case 'lmstudio':
      return {
        model: model,
        temperature: 0.8,
        baseUrl: 'http://localhost:1234/v1'
      };
    case 'huggingface':
      return {
        model: model,
        temperature: 0.8
      };
    case 'openrouter':
      return {
        model: model,
        temperature: 0.8,
        baseUrl: 'https://openrouter.ai/api/v1'
      };
    default:
      return {
        model: model,
        temperature: 0.7
      };
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

// Função para gerar história usando diferentes provedores
export const generateStory = async (request: StoryRequest): Promise<StoryResponse> => {
  const { anime, protagonists, mode, model, includeActs = false, continueStory = false, previousParts = [] } = request;
  
  const modelConfig = getModelConfig(model);
  const provider = MODEL_PROVIDERS[model] || 'mistral';
  
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
    // Para LM Studio, usar API local
    if (provider === 'lmstudio') {
      const response = await fetch(`${modelConfig.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: ADULT_SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          temperature: modelConfig.temperature,
          max_tokens: 2000
        })
      });
      
      if (!response.ok) {
        throw new Error(`LM Studio API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      const story = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '';
      return { story };
    }
    // Para Hugging Face
    else if (provider === 'huggingface') {
      const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: userPrompt,
          parameters: {
            temperature: modelConfig.temperature,
            max_new_tokens: 1000
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Hugging Face API error: ${errorData.error || response.statusText}`);
      }
      
      const data = await response.json();
      // Hugging Face retorna o texto em data[0].generated_text
      const story = data[0]?.generated_text || data.generated_text || '';
      return { story };
    }
    // Para OpenRouter
    else if (provider === 'openrouter') {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: ADULT_SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          temperature: modelConfig.temperature,
          max_tokens: 2000
        })
      });
      
      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      const story = data.choices?.[0]?.message?.content || '';
      return { story };
    }
    // Para Mistral (padrão)
    else {
      const response = await mistralClient.chat.complete({
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
    }
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error('Falha ao gerar a história. Tente novamente.');
  }
};

export const listModels = async (): Promise<ModelType[]> => {
  return FREE_MODELS;
};
