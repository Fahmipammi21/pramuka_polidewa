import { Router } from 'express';
import {
  getBeritaList,
  getBeritaByIdOrSlug,
  createBerita,
  updateBerita,
  deleteBerita,
  uploadFotoKegiatan,
} from '../controllers/berita.controller.js';

const router = Router();

router.get('/', getBeritaList);
router.post('/upload', uploadFotoKegiatan);
router.post('/', createBerita);
router.get('/:identifier', getBeritaByIdOrSlug);
router.put('/:id', updateBerita);
router.delete('/:id', deleteBerita);

export default router;
