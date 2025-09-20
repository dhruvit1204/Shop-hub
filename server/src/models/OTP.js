import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  otp: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['signup', 'login', 'reset-password'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // OTP expires after 10 minutes (600 seconds)
  }
});

// Create a compound index for email and purpose to ensure uniqueness
otpSchema.index({ email: 1, purpose: 1 }, { unique: true });

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
