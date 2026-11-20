export const CONFIG = {
  port: process.env.PORT || 3001,
  mistralApiKey: process.env.MISTRAL_API_KEY || '',
  ollamaApiKey: process.env.OLLAMA_API_KEY || 'caef2eacfafa47fe9f82d1b46020db2f.MjET7I2r_GvlKyyO-lxZjFgw',
  huggingfaceApiKey: process.env.HUGGINGFACE_API_KEY || '',
  openrouterApiKey: process.env.OPENROUTER_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  jikanApiUrl: 'https://api.jikan.moe/v4',
  defaultModels: [
    'llama2',
    'mistral',
    'phi',
    'gemma',
    'lms-sk-X384l750YhR1-yOSnua9NnTM4_H8EU7dRo3WCMB7X0Q',
    'NousResearch/Llama-2-7b-chat',
    'mistralai/Mistral-7B-Instruct-v0.1',
    'llama-2-7b-chat',
    'phi-2'
  ]
};
