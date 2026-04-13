import express from 'express';
import { getCrops, addCrop, deleteCrop, updateCrop } from '../controllers/cropController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getCrops)
  .post(protect, admin, addCrop);

router.route('/:id')
  .put(protect, admin, updateCrop)
  .delete(protect, admin, deleteCrop);

export default router;
