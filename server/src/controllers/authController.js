import User from '../models/User.js';
import { generateAndSendOTP, verifyOTP } from '../services/otpService.js';
import { generateToken } from '../utils/jwtUtils.js';

/**
 * Send OTP for signup or login
 * @route POST /api/auth/send-otp
 */
export const sendOtp = async (req, res) => {
  try {
    const { email, action, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    if (!action || !['signup', 'login'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Valid action (signup or login) is required'
      });
    }

    // For signup, check if user already exists and is verified
    if (action === 'signup') {
      const existingUser = await User.findOne({ email });
      
      if (existingUser && existingUser.isVerified) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
    }

    // For login, check if user exists and is verified
    if (action === 'login') {
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({
          success: false, 
          message: 'User not found. Please sign up first.'
        });
      }
      
      if (!user.isVerified) {
        return res.status(403).json({
          success: false,
          message: 'Account not verified. Please verify your email first.'
        });
      }
    }

    // Generate and send OTP
    await generateAndSendOTP(email, action, name);

    res.status(200).json({
      success: true,
      message: `OTP sent to ${email}`
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending OTP'
    });
  }
};

/**
 * Verify OTP and register new user
 * @route POST /api/auth/verify-otp
 */
export const verifyUserOtp = async (req, res) => {
  try {
    const { email, otp, action, name } = req.body;

    if (!email || !otp || !action) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and action are required'
      });
    }

    // Verify OTP
    const isValid = await verifyOTP(email, otp, action);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    let user;

    // Handle signup or login based on action
    if (action === 'signup') {
      // Check if user already exists but is not verified
      user = await User.findOne({ email });

      if (user) {
        // Update existing unverified user
        user.isVerified = true;
        if (name) user.name = name;
        await user.save();
      } else {
        // Create new user
        if (!name) {
          return res.status(400).json({
            success: false,
            message: 'Name is required for signup'
          });
        }

        user = await User.create({
          name,
          email,
          isVerified: true
        });
      }
    } else if (action === 'login') {
      // Find the user
      user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Update last login time
      user.lastLogin = new Date();
      await user.save();
    }

    // Generate JWT token
    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email
    });

    res.status(200).json({
      success: true,
      message: action === 'signup' ? 'Account created successfully' : 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP'
    });
  }
};

/**
 * Register new user and send OTP
 * @route POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and password are required.'
      });
    }
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists.'
      });
    }
    if (!user) {
      user = new User({ name, email, phone, password, isVerified: false });
    } else {
      user.name = name;
      user.phone = phone;
      user.password = password;
      user.isVerified = false;
    }
    await user.save();
    // Send OTP for verification
    await generateAndSendOTP(email, 'signup', name);
    res.status(200).json({
      success: true,
      message: `Registration initiated. OTP sent to ${email}.`
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during registration.'
    });
  }
};

/**
 * Verify OTP and activate user
 * @route POST /api/auth/verify-otp
 */
export const verifyUserOtpNew = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required.'
      });
    }
    const isValid = await verifyOTP(email, otp, 'signup');
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP.'
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }
    user.isVerified = true;
    await user.save();
    res.status(200).json({
      success: true,
      message: 'Account verified successfully.'
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP.'
    });
  }
};

/**
 * Login with email and password
 * @route POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please sign up first.'
      });
    }
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Account not verified. Please verify your email first.'
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }
    user.lastLogin = new Date();
    await user.save();
    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email
    });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login.'
    });
  }
};

/**
 * Get current user profile
 * @route GET /api/auth/me
 * @access Private
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving user profile'
    });
  }
};

export default {
  sendOtp,
  verifyUserOtp,
  register,
  verifyUserOtpNew,
  login,
  getUserProfile
};
