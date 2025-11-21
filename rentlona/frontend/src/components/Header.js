import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LocationModal from './LocationModal';
import './Header.css';

const Header = ({ onLocationChange }) => {
  const { user, logout } = useContext(AuthContext);
  const [selectedCity, setSelectedCity] = useState('Select Location');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLocationSelect = (city) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
    setShowLocationModal(false);

    // Dispatch custom event to notify other components about city change
    window.dispatchEvent(new CustomEvent('cityChanged', { detail: city }));
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>RentLONA.com</h1>
        </Link>

        <div className="location-selector">
          <button
            className="location-btn"
            onClick={() => setShowLocationModal(!showLocationModal)}
            title="Change Location"
          >
            <span className="location-icon">📍</span>
            <span className="location-text">{selectedCity}</span>
            <span className="dropdown-arrow" style={{transform: showLocationModal ? 'rotate(180deg)' : 'rotate(0deg)'}}>▼</span>
          </button>

          {showLocationModal && (
            <div className="location-dropdown">
              <div className="dropdown-header">
                <h3>📍 Select Your City</h3>
                <button className="close-btn" onClick={() => setShowLocationModal(false)}>✕</button>
              </div>
              <div className="dropdown-content">
                <button
                  className="current-location-btn"
                  onClick={() => {
                    // Handle current location logic here
                    setShowLocationModal(false);
                  }}
                >
                  📍 Use My Current Location
                </button>

                <div className="location-search">
                  <input
                    type="text"
                    placeholder="Search city..."
                    className="city-search"
                  />
                </div>

                <div className="cities-section">
                  <h4>Popular Cities</h4>
                  <div className="cities-grid">
                    {[
                      'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata',
                      'Ahmedabad', 'Jaipur', 'Chandigarh', 'Lucknow', 'Indore', 'Surat',
                      'Coimbatore', 'Bhopal', 'Nagpur', 'Kochi', 'Patna', 'Guwahati'
                    ].map(city => (
                      <button
                        key={city}
                        className="city-btn"
                        onClick={() => handleLocationSelect(city)}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <nav className="nav">
          <Link to="/listings">Browse</Link>
          <Link to="/dashboard" className="btn btn-primary">
            Dashboard
          </Link>
          {user ? (
            <>
              <Link to="/create-listing" className="btn btn-primary">
                Post Listings
              </Link>
              <Link to="/messages">Messages</Link>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
