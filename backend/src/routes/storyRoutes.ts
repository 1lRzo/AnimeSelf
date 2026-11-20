import { Router } from 'express';
import { generateStory, listModels } from '../services/mistralService';
import { StoryRequest } from '../types';

const router = Router();

router.post('/generate', async (req, res, next) => {
  try {
    const request: StoryRequest = req.body;
    
    if (!request.anime) {
      return res.status(400).json({ error: 'Anime is required' });
    }
    
    if (!request.protagonists || request.protagonists.length === 0) {
      return res.status(400).json({ error: 'At least one protagonist is required' });
    }
    
    if (!request.mode) {
      return res.status(400).json({ error: 'Mode is required' });
    }
    
    if (!request.model) {
      return res.status(400).json({ error: 'Model is required' });
    }
    
    const result = await generateStory(request);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/models', async (req, res, next) => {
  try {
    const models = await listModels();
    res.json({ models });
  } catch (error) {
    next(error);
  }
});

export default router;
