import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { sendEmail } from '../services/emailService.js';

const router = express.Router();

// Order confirmation email endpoint
router.post('/send-order', protect, async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    await sendEmail(to, subject, body);
    res.json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error('Error sending order email:', error);
    res.status(500).json({ success: false, message: 'Email send failed', error: error.message });
  }
});

export default router;
