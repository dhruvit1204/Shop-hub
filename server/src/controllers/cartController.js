import User from '../models/User.js';

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.productId');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add or update item in cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) return res.status(400).json({ success: false, message: 'Product and quantity required' });
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const idx = user.cart.findIndex(item => item.productId.toString() === productId);
    if (idx > -1) {
      user.cart[idx].quantity = quantity;
    } else {
      user.cart.push({ productId, quantity });
    }
    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.cart = user.cart.filter(item => item._id.toString() !== itemId);
    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
