import express from 'express';
import { getRules, addRule, deleteRule } from '../controllers/ruleController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getRules)
  .post(protect, admin, addRule);

router.route('/:id')
  .delete(protect, admin, deleteRule);

export default router;
