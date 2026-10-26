import { Router } from 'express';
import { getBeritaList, getBeritaBySlug } from '../controllers/berita.controller.js';

const router = Router();

router.get('/', getBeritaList);
router.get('/:slug', getBeritaBySlug);

export default router;
