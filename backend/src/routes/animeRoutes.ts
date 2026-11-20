import { Router } from 'express';
import { searchAnime, getAnimeById, getTopAnime, getAnimeRatings } from '../services/jikanService';
import { SearchParams } from '../types';

const router = Router();

router.get('/search', async (req, res, next) => {
  try {
    const { q, page, per_page, rating } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    
    const params: SearchParams = {
      q,
      page: page ? Number(page) : undefined,
      per_page: per_page ? Number(per_page) : undefined,
      rating: rating ? String(rating) : undefined
    };
    
    const result = await searchAnime(params);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/top', async (req, res, next) => {
  try {
    const { page, rating } = req.query;
    
    const result = await getTopAnime(
      page ? Number(page) : 1,
      rating ? String(rating) : undefined
    );
    
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/ratings', async (req, res, next) => {
  try {
    const ratings = await getAnimeRatings();
    res.json({ ratings });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const anime = await getAnimeById(Number(id));
    res.json({ data: anime });
  } catch (error) {
    next(error);
  }
});

export default router;
