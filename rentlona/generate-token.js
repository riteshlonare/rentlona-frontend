const jwt = require('jsonwebtoken');

// Generate JWT token for testing
const generateToken = (userId) => {
  return jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Example usage - replace with actual user ID from your database
const userId = 'YOUR_USER_ID_HERE'; // Get this from MongoDB
const token = generateToken(userId);

console.log('Generated JWT Token:', token);
console.log('Use this token in your Authorization header: Bearer', token);

// To run this script: node generate-token.js
