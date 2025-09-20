import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure mail transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send OTP email to the user
 * @param {string} to - Recipient email address
 * @param {string} otp - One-Time Password
 * @param {string} purpose - Purpose of OTP ('signup', 'login', 'reset-password')
 * @returns {Promise} - Nodemailer response
 */
export const sendOTPEmail = async (to, otp, purpose, name = '') => {
  // Determine the subject and template based on purpose
  let subject = '';
  let htmlTemplate = '';

  switch (purpose) {
    case 'signup':
      subject = 'Verify Your Email for ShopHub';
      htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Welcome to ShopHub!</h2>
          <p>Hi ${name || 'there'},</p>
          <p>Thank you for signing up with ShopHub. To complete your registration, please verify your email address using the following verification code:</p>
          <div style="background-color: #f5f5f5; padding: 12px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0; border-radius: 4px;">${otp}</div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, you can safely ignore this email.</p>
          <p>Best regards,<br>The ShopHub Team</p>
        </div>
      `;
      break;
    case 'login':
      subject = 'Your ShopHub Login Code';
      htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">ShopHub Login Verification</h2>
          <p>Hi there,</p>
          <p>You requested to log in to your ShopHub account. Use the following verification code to complete your login:</p>
          <div style="background-color: #f5f5f5; padding: 12px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0; border-radius: 4px;">${otp}</div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't attempt to log in, someone might be trying to access your account. Please consider changing your password.</p>
          <p>Best regards,<br>The ShopHub Team</p>
        </div>
      `;
      break;
    case 'reset-password':
      subject = 'Reset Your ShopHub Password';
      htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p>Hi there,</p>
          <p>We received a request to reset your ShopHub account password. Use the following verification code to reset your password:</p>
          <div style="background-color: #f5f5f5; padding: 12px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0; border-radius: 4px;">${otp}</div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <p>Best regards,<br>The ShopHub Team</p>
        </div>
      `;
      break;
    default:
      subject = 'ShopHub Verification Code';
      htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Your Verification Code</h2>
          <p>Hi there,</p>
          <p>Use the following verification code:</p>
          <div style="background-color: #f5f5f5; padding: 12px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0; border-radius: 4px;">${otp}</div>
          <p>This code will expire in 10 minutes.</p>
          <p>Best regards,<br>The ShopHub Team</p>
        </div>
      `;
  }

  // Email options
  const mailOptions = {
    from: `ShopHub <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlTemplate
  };

  // Send email
  return await transporter.sendMail(mailOptions);
};

/**
 * Generic email sender
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 */
export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `ShopHub <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  };
  return await transporter.sendMail(mailOptions);
};

export default { sendOTPEmail, sendEmail };
