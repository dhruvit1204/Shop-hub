import express from 'express';
import { sendOtp, verifyUserOtp, getUserProfile, register, verifyUserOtpNew, login } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/verify-otp', verifyUserOtpNew);
router.post('/login', login);
router.post('/send-otp', sendOtp);
// router.post('/verify-otp', verifyUserOtp); // Deprecated, replaced by verifyUserOtpNew

// Protected routes
router.get('/me', protect, getUserProfile);

export default router;
