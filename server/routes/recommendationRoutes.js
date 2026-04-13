import express from 'express';
import { getRecommendation, getHistory } from '../controllers/recommendationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/predict', protect, getRecommendation);
router.get('/history', protect, getHistory);

export default router;
