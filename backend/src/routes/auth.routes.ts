import { Router } from 'express';
import { loginAdmin, getMe } from '../controllers/auth.controller.js';
import { authenticateJwt } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', loginAdmin);
router.get('/me', authenticateJwt, getMe);

export default router;
