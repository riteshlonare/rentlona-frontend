import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Have questions? We're here to help!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h3>Email Support</h3>
                <p>rentlonaplatform@gmail.com</p>
                <span className="info-note">Responds within 24 hours</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h3>Phone Support</h3>
                <p>+917387857638</p>
                <span className="info-note">Mon-Fri: 9AM - 6PM IST</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Office Address</h3>
                <p>Nagpur, Maharashtra 440022<br />India</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">💬</div>
              <div className="info-content">
                <h3>Live Chat</h3>
                <p>Available 24/7</p>
                <button className="chat-btn">Start Chat</button>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="listing">Listing Issues</option>
                  <option value="account">Account Issues</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us how we can help you..."
                  rows="4"
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="faq-section">
          <h2>FAQ</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h4>How do I create a listing?</h4>
              <p>Sign up, go to dashboard, click "Post Listings", fill details and upload photos.</p>
            </div>

            <div className="faq-item">
              <h4>What rental periods are available?</h4>
              <p>We offer daily and monthly rental options.</p>
            </div>

            <div className="faq-item">
              <h4>How do I contact other users?</h4>
              <p>Use our messaging system to communicate directly.</p>
            </div>

            <div className="faq-item">
              <h4>Are there fees for listings?</h4>
              <p>Basic listings are free. Premium features cost extra.</p>
            </div>

            <div className="faq-item">
              <h4>How do I report an issue?</h4>
              <p>Use the "Report" button or contact support directly.</p>
            </div>

            <div className="faq-item">
              <h4>Can I edit my listings?</h4>
              <p>Yes, click "Edit" in your dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
