const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('listings')
      .populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const allowedFields = ['name', 'profile'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to favorites
router.post('/favorites/:listingId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.favorites.includes(req.params.listingId)) {
      user.favorites.push(req.params.listingId);
      await user.save();
    }

    res.json({ message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from favorites
router.delete('/favorites/:listingId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
      id => id.toString() !== req.params.listingId
    );

    await user.save();

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user favorites
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('favorites');

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
