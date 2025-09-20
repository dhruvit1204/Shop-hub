import User from '../models/User.js';

// Address CRUD
export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, addresses: user.addresses || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching addresses' });
  }
};

export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses.push(req.body);
    await user.save();
    res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding address' });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const idx = user.addresses.findIndex((a, i) => i === Number(req.params.index));
    if (idx === -1) return res.status(404).json({ success: false, message: 'Address not found' });
    user.addresses[idx] = req.body;
    await user.save();
    res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating address' });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses.splice(req.params.index, 1);
    await user.save();
    res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting address' });
  }
};

// Wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist.productId');
    res.json({ success: true, wishlist: user.wishlist || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching wishlist' });
  }
};

// Orders
export const getOrders = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('orders.orderId');
    res.json({ success: true, orders: user.orders || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};
