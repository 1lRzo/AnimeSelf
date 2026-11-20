export const CONFIG = {
  port: process.env.PORT || 3001,
  mistralApiKey: process.env.MISTRAL_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  jikanApiUrl: 'https://api.jikan.moe/v4',
  defaultModels: ['mimo-v2.6-flash:free', 'deepseek-v4.1-flash:free']
};
