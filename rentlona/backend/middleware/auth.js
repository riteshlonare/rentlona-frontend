const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth middleware - Token received:', token ? 'present' : 'not present');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - Decoded user ID:', decoded._id);
    const user = await User.findById(decoded._id);
    console.log('Auth middleware - User found:', user ? user.name : 'not found');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Auth middleware - Error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
