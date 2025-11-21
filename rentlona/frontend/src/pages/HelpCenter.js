import React, { useState } from 'react';
import './HelpCenter.css';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'listings', name: 'Listings', icon: '📦' },
    { id: 'rentals', name: 'Rentals', icon: '🔄' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'safety', name: 'Safety', icon: '🛡️' }
  ];

  const helpTopics = [
    {
      id: 1,
      category: 'account',
      title: 'How do I create an account?',
      content: 'Click the "Sign Up" button in the top right corner. Fill in your details including name, email, and password. Verify your email address to complete registration.'
    },
    {
      id: 2,
      category: 'account',
      title: 'How do I reset my password?',
      content: 'Go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your email.'
    },
    {
      id: 3,
      category: 'listings',
      title: 'How do I create a listing?',
      content: 'Go to your dashboard and click "Post Listings". Fill in the item details, upload photos, set pricing, and publish your listing.'
    },
    {
      id: 4,
      category: 'listings',
      title: 'How do I edit my listing?',
      content: 'Go to your dashboard, find the listing under "My Listings", and click the "Edit" button to make changes.'
    },
    {
      id: 5,
      category: 'rentals',
      title: 'How do I rent an item?',
      content: 'Browse listings, click on an item you\'re interested in, and click "Request to Rent". Choose your rental period and complete the booking.'
    },
    {
      id: 6,
      category: 'rentals',
      title: 'How do I contact a renter/owner?',
      content: 'Use our built-in messaging system. Click the "Message" button on any listing or user profile to start a conversation.'
    },
    {
      id: 7,
      category: 'payments',
      title: 'What payment methods are accepted?',
      content: 'We accept credit cards, debit cards, UPI, and net banking. All payments are processed securely through our payment partners.'
    },
    {
      id: 8,
      category: 'payments',
      title: 'When do I get paid for rentals?',
      content: 'Payments are released to owners 24 hours after the rental period begins, provided there are no issues reported.'
    },
    {
      id: 9,
      category: 'safety',
      title: 'How do I report a problem?',
      content: 'Use the "Report" button on any listing or message. You can also contact our support team directly through the contact page.'
    },
    {
      id: 10,
      category: 'safety',
      title: 'What if the item is damaged?',
      content: 'Report any damage immediately with photos. Our team will mediate and help resolve the issue according to our terms.'
    }
  ];

  const filteredTopics = helpTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || topic.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="help-center">
      <div className="help-container">
        <div className="help-header">
          <h1>Help Center</h1>
          <p>Find answers to your questions and get the help you need</p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="help-content">
          <div className="topics-grid">
            {filteredTopics.map(topic => (
              <div key={topic.id} className="help-topic">
                <h3>{topic.title}</h3>
                <p>{topic.content}</p>
              </div>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="no-results">
              <h3>No results found</h3>
              <p>Try adjusting your search terms or browse different categories.</p>
            </div>
          )}
        </div>

        <div className="contact-support">
          <h2>Still need help?</h2>
          <p>Can't find what you're looking for? Our support team is here to help.</p>
          <div className="support-options">
            <div className="support-option">
              <span className="support-icon">💬</span>
              <h4>Live Chat</h4>
              <p>Get instant help from our support team</p>
              <button className="support-btn">Start Chat</button>
            </div>
            <div className="support-option">
              <span className="support-icon">📧</span>
              <h4>Email Support</h4>
              <p>Send us an email and we'll respond within 24 hours</p>
              <a href="/contact" className="support-btn">Contact Us</a>
            </div>
            <div className="support-option">
              <span className="support-icon">📞</span>
              <h4>Phone Support</h4>
              <p>Call us during business hours</p>
              <p className="phone-number">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
