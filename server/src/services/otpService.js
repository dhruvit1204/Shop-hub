import otpGenerator from 'otp-generator';
import OTP from '../models/OTP.js';
import { sendOTPEmail } from './emailService.js';

/**
 * Generate OTP and save it to the database
 * @param {string} email - User's email
 * @param {string} purpose - Purpose of OTP ('signup', 'login', 'reset-password')
 * @param {string} name - User's name (optional, for signup)
 * @returns {Promise<string>} - Generated OTP
 */
export const generateAndSendOTP = async (email, purpose, name = '') => {
  try {
    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    });

    // Check if an OTP already exists for this email and purpose
    const existingOTP = await OTP.findOne({ email, purpose });

    if (existingOTP) {
      // Update existing OTP
      existingOTP.otp = otp;
      existingOTP.createdAt = Date.now();
      await existingOTP.save();
    } else {
      // Create new OTP document
      await OTP.create({
        email,
        otp,
        purpose
      });
    }

    // Log OTP to console for testing purposes
    console.log('\x1b[36m%s\x1b[0m', `🔑 TEST MODE: OTP for ${email} (${purpose}): ${otp}`);

    try {
      // Attempt to send OTP via email, but don't fail if email config is incomplete
      await sendOTPEmail(email, otp, purpose, name);
    } catch (emailError) {
      console.log('\x1b[33m%s\x1b[0m', `⚠️ Email not sent: ${emailError.message}. Using console OTP for testing.`);
    }

    return otp;
  } catch (error) {
    console.error('Error generating/sending OTP:', error);
    throw new Error('Failed to generate and send OTP');
  }
};

/**
 * Verify OTP for a given email and purpose
 * @param {string} email - User's email
 * @param {string} otp - OTP to verify
 * @param {string} purpose - Purpose of OTP ('signup', 'login', 'reset-password')
 * @returns {Promise<boolean>} - True if OTP is valid, false otherwise
 */
export const verifyOTP = async (email, otp, purpose) => {
  try {
    // Find the OTP record
    const otpRecord = await OTP.findOne({
      email,
      purpose
    });

    // Check if OTP exists and matches
    if (!otpRecord) {
      return false;
    }

    if (otpRecord.otp !== otp) {
      return false;
    }

    // OTP is valid, now delete it to prevent reuse
    await OTP.deleteOne({ _id: otpRecord._id });

    return true;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw new Error('Failed to verify OTP');
  }
};

export default {
  generateAndSendOTP,
  verifyOTP
};
