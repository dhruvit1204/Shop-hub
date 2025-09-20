import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cartItemSchema from './CartItem.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10,15}$/, 'Please provide a valid phone number']
  },
  password: {
    type: String,
    select: false // Don't include password in query results by default
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  addresses: [
    {
      label: { type: String, default: 'Home' },
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      phone: String
    }
  ],
  wishlist: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  orders: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      },
      orderedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  cart: [cartItemSchema]
});

// Hash password before saving if it's modified
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if password matches
userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
