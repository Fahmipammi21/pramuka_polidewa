import { Router } from 'express';
import { getStrukturAktif } from '../controllers/struktur.controller.js';

const router = Router();

router.get('/', getStrukturAktif);

export default router;
