import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>RentLONA</h3>
          <p>Your trusted rental platform — rent everything you need, from properties to electronics.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/listings">Browse Listings</a></li>
            <li><a href="/create-listing">List Your Item</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61583651739688" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://x.com/RentLona" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 RentLONA.com — All Rights Reserved | Made with ❤️ in India</p>
      </div>
    </footer>
  );
};

export default Footer;
