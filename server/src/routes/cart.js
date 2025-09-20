import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user's cart
router.get('/', authMiddleware, getCart);
// Add/update cart item
router.post('/', authMiddleware, addToCart);
// Remove cart item
router.delete('/:itemId', authMiddleware, removeFromCart);

export default router;
