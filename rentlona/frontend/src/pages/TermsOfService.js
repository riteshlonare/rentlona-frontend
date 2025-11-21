import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="terms-service">
      <div className="terms-container">
        <div className="terms-header">
          <h1>Terms of Service</h1>
          <p>Last updated: November 2025</p>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using RentLONA ("the Platform"), you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Description of Service</h2>
            <p>
              RentLONA is a peer-to-peer rental platform that connects people who want to rent out items with those who need them.
              We provide the platform, tools, and services to facilitate these transactions, but we are not a party to any rental agreements.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. User Accounts</h2>

            <h3>3.1 Account Creation</h3>
            <p>To use our services, you must create an account with accurate and complete information.</p>

            <h3>3.2 Account Security</h3>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>

            <h3>3.3 Age Requirements</h3>
            <p>You must be at least 18 years old to create an account and use our services.</p>
          </section>

          <section className="terms-section">
            <h2>4. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Post false, misleading, or fraudulent listings</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Interfere with the platform's operations</li>
              <li>Use the platform for illegal activities</li>
              <li>Share account credentials with others</li>
              <li>Attempt to hack or compromise the platform</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>5. Listings and Rentals</h2>

            <h3>5.1 Listing Requirements</h3>
            <p>All listings must be accurate, legal, and comply with our guidelines. Items must be owned by the lister.</p>

            <h3>5.2 Rental Agreements</h3>
            <p>Rental agreements are between the owner and renter. RentLONA facilitates but is not responsible for these agreements.</p>

            <h3>5.3 Prohibited Items</h3>
            <p>Certain items cannot be listed, including illegal items, weapons, hazardous materials, and stolen property.</p>
          </section>

          <section className="terms-section">
            <h2>6. Payments and Fees</h2>

            <h3>6.1 Service Fees</h3>
            <p>RentLONA charges service fees for facilitating transactions. Current fees are displayed on our platform.</p>

            <h3>6.2 Payment Processing</h3>
            <p>Payments are processed through secure third-party providers. We are not responsible for payment processor issues.</p>

            <h3>6.3 Refunds</h3>
            <p>Refunds are handled according to our refund policy and applicable laws.</p>
          </section>

          <section className="terms-section">
            <h2>7. Liability and Disclaimers</h2>

            <h3>7.1 Platform Liability</h3>
            <p>RentLONA is not liable for interactions between users, item quality, or transaction outcomes.</p>

            <h3>7.2 Item Condition</h3>
            <p>Owners warrant that listed items are accurately described and safe for intended use.</p>

            <h3>7.3 Service Availability</h3>
            <p>We strive for high availability but do not guarantee uninterrupted service.</p>
          </section>

          <section className="terms-section">
            <h2>8. Dispute Resolution</h2>
            <p>
              Users should attempt to resolve disputes directly. RentLONA may mediate disputes at our discretion.
              For unresolved disputes, users agree to binding arbitration in accordance with applicable laws.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these terms.
              Users may terminate their accounts at any time.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Intellectual Property</h2>
            <p>
              The RentLONA platform and its content are protected by intellectual property laws.
              Users retain rights to their content but grant us license to display it on the platform.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which is incorporated into these Terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. Users will be notified of material changes.
            </p>
          </section>

          <section className="terms-section">
            <h2>13. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes will be resolved in the courts of Mumbai, Maharashtra.
            </p>
          </section>

          <section className="terms-section">
            <h2>14. Contact Information</h2>
            <p>If you have questions about these Terms, please contact us:</p>
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

export default TermsOfService;
