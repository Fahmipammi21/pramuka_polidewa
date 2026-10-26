import { Router } from 'express';
import beritaRoutes from './berita.routes.js';
import strukturRoutes from './struktur.routes.js';
import pendaftaranRoutes from './pendaftaran.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

// Health Check
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'pramuka-polidewa-api',
    timestamp: new Date().toISOString(),
  });
});

router.use('/berita', beritaRoutes);
router.use('/struktur', strukturRoutes);
router.use('/pendaftaran', pendaftaranRoutes);
router.use('/auth', authRoutes);

export default router;
