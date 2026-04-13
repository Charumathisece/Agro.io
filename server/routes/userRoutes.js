import express from 'express';
import { getUsers, deleteUser, getUserProfile, updatePassword } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/profile/password', protect, updatePassword);
router.get('/', protect, admin, getUsers);
router.get('/profile', protect, getUserProfile);
router.delete('/:id', protect, admin, deleteUser);

export default router;
