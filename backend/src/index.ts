import express from 'express';
import cors from 'cors';
import animeRoutes from './routes/animeRoutes';
import storyRoutes from './routes/storyRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { CONFIG } from './config';

const app = express();
const PORT = CONFIG.port;

app.use(cors({
  origin: CONFIG.corsOrigin,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/anime', animeRoutes);
app.use('/api/story', storyRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

export default app;
