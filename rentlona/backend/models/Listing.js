const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['property', 'vehicles', 'electronics', 'furniture', 'clothing']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rentalPeriod: {
    type: String,
    enum: ['daily', 'monthly'],
    default: 'daily'
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  images: [{
    url: String,
    alt: String
  }],
  specifications: {
    type: mongoose.Schema.Types.Mixed
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'rented'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
listingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Listing', listingSchema);
