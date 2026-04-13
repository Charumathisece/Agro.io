import express from 'express';
import { getFertilizers, addFertilizer, deleteFertilizer } from '../controllers/fertilizerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getFertilizers)
  .post(protect, admin, addFertilizer);

router.route('/:id')
  .delete(protect, admin, deleteFertilizer);

export default router;
