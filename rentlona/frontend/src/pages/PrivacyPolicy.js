import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="policy-container">
        <div className="policy-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: January 2025</p>
        </div>

        <div className="policy-content">
          <section className="policy-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to RentLONA ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our rental platform.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Information We Collect</h2>

            <h3>2.1 Personal Information</h3>
            <p>We collect information you provide directly to us, including:</p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Profile information and preferences</li>
              <li>Payment information and billing details</li>
              <li>Identification documents for verification</li>
              <li>Communications with us</li>
            </ul>

            <h3>2.2 Usage Information</h3>
            <p>We automatically collect certain information when you use our platform:</p>
            <ul>
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Usage patterns and preferences</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process transactions and payments</li>
              <li>Verify user identities and prevent fraud</li>
              <li>Communicate with you about our services</li>
              <li>Improve our platform and develop new features</li>
              <li>Comply with legal obligations</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Information Sharing</h2>
            <p>We may share your information in the following circumstances:</p>

            <h3>4.1 With Other Users</h3>
            <p>Certain information is shared between renters and owners to facilitate transactions, including:</p>
            <ul>
              <li>Profile information and contact details</li>
              <li>Transaction history and ratings</li>
              <li>Communication history</li>
            </ul>

            <h3>4.2 Service Providers</h3>
            <p>We share information with third-party service providers who help us operate our platform, including:</p>
            <ul>
              <li>Payment processors</li>
              <li>Cloud storage providers</li>
              <li>Analytics services</li>
              <li>Customer support tools</li>
            </ul>

            <h3>4.3 Legal Requirements</h3>
            <p>We may disclose information if required by law or to protect our rights and safety.</p>
          </section>

          <section className="policy-section">
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="policy-section">
            <h2>6. Your Rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request transfer of your data</li>
              <li><strong>Objection:</strong> Object to processing of your data</li>
              <li><strong>Restriction:</strong> Request limitation of data processing</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="policy-section">
            <h2>8. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
              We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="policy-section">
            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 18. We do not knowingly collect personal information from children under 18.
              If we become aware of such collection, we will delete the information immediately.
            </p>
          </section>

          <section className="policy-section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy
              on our website and updating the "Last updated" date.
            </p>
          </section>

          <section className="policy-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> rentlonaplatform@gmail.com</p>
              <p><strong>Phone:</strong> +917387857638</p>
              <p><strong>Address:</strong> Nagpur, Maharashtra 440022, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
