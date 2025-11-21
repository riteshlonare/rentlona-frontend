const express = require('express');
const Listing = require('../models/Listing');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all listings with filters
router.get('/', async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (location && location !== 'All India') query['location.city'] = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const listings = await Listing.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('user', 'name email profile');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload images for listing
router.post('/upload', auth, upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      alt: file.originalname
    }));

    res.json({ images: imageUrls });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Create listing
router.post('/', auth, async (req, res) => {
  try {
    const listingData = { ...req.body, user: req.user._id };

    // Handle location if it's a string (JSON)
    if (typeof listingData.location === 'string') {
      listingData.location = JSON.parse(listingData.location);
    }

    const listing = new Listing(listingData);
    await listing.save();

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update listing
router.put('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(listing, req.body);
    await listing.save();

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await listing.remove();

    // Remove from user's listings
    req.user.listings = req.user.listings.filter(
      id => id.toString() !== req.params.id
    );
    await req.user.save();

    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's listings
router.get('/user/:userId', async (req, res) => {
  try {
    const listings = await Listing.find({ user: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get authenticated user's listings
router.get('/user', auth, async (req, res) => {
  try {
    const listings = await Listing.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
