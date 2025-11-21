import React, { useState } from 'react';
import './LocationModal.css';

const LocationModal = ({ onLocationSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const popularCities = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata',
    'Ahmedabad', 'Jaipur', 'Chandigarh', 'Lucknow', 'Indore', 'Surat',
    'Coimbatore', 'Bhopal', 'Nagpur', 'Kochi', 'Patna', 'Guwahati'
  ];

  const allCities = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata',
    'Ahmedabad', 'Jaipur', 'Chandigarh', 'Lucknow', 'Indore', 'Surat',
    'Coimbatore', 'Bhopal', 'Nagpur', 'Kochi', 'Patna', 'Guwahati',
    'Vadodara', 'Thane', 'Rajkot', 'Bhubaneswar', 'Salem', 'Warangal',
    'Ranchi', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai',
    'Raipur', 'Kota', 'Guwahati', 'Chandrapur', 'Udaipur', 'Ajmer'
  ];

  const filteredCities = allCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();

            if (data.city) {
              onLocationSelect(data.city);
            } else {
              alert('Could not determine your city. Please select manually.');
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Error getting location:', error);
            alert('Could not determine your city. Please select manually.');
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Location access denied. Please select your city manually.');
          setIsLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
  };

  return (
    <div className="location-modal-overlay" onClick={onClose}>
      <div className="location-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>✕</button>
          <h2>📍 Where are you renting from?</h2>
          <p>Select your city to see listings and offers near you</p>
        </div>

        <div className="modal-content">
          <button
            className="current-location-btn"
            onClick={handleCurrentLocation}
            disabled={isLoading}
          >
            {isLoading ? '🔄 Detecting Location...' : '📍 Use My Current Location'}
          </button>

          <div className="search-section">
            <input
              type="text"
              placeholder="Search city or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="city-search"
            />
          </div>

          <div className="popular-cities">
            <h3>Popular Cities</h3>
            <div className="cities-grid">
              {popularCities.map(city => (
                <button
                  key={city}
                  className="city-btn"
                  onClick={() => onLocationSelect(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {searchTerm && (
            <div className="search-results">
              <h4>All Cities</h4>
              <div className="cities-list">
                {filteredCities.slice(0, 10).map(city => (
                  <button
                    key={city}
                    className="city-option"
                    onClick={() => onLocationSelect(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
