import { Router } from 'express';
import {
  submitPendaftaran,
  getPendaftaranList,
  updatePendaftaranStatus,
  getDashboardStats,
} from '../controllers/pendaftaran.controller.js';

const router = Router();

// Public submission
router.post('/', submitPendaftaran);

// Dashboard & management
router.get('/', getPendaftaranList);
router.get('/stats', getDashboardStats);
router.patch('/:id/status', updatePendaftaranStatus);

export default router;
