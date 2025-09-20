import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAddresses, addAddress, updateAddress, deleteAddress,
  getWishlist, getOrders
} from '../controllers/profileController.js';

const router = express.Router();

// Address CRUD
router.get('/addresses', protect, getAddresses);
router.post('/addresses', protect, addAddress);
router.put('/addresses/:index', protect, updateAddress);
router.delete('/addresses/:index', protect, deleteAddress);

// Wishlist
router.get('/wishlist', protect, getWishlist);

// Orders
router.get('/orders', protect, getOrders);

export default router;
