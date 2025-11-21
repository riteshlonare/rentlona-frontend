import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { listingsAPI } from '../services/api';
import './Listings.css';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: localStorage.getItem('selectedCity') || '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });

  const fetchListings = useCallback(async () => {
    try {
      const params = {};
      Object.keys(filters).forEach(key => {
        if (filters[key]) params[key] = filters[key];
      });

      const response = await listingsAPI.getAll(params);
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      // Show error message to user
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  useEffect(() => {
    const handleCityChange = (event) => {
      const newCity = event.detail;
      setFilters(prev => ({
        ...prev,
        location: newCity === 'All India' ? '' : newCity
      }));
    };

    window.addEventListener('cityChanged', handleCityChange);

    return () => {
      window.removeEventListener('cityChanged', handleCityChange);
    };
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: localStorage.getItem('selectedCity') || '',
      minPrice: '',
      maxPrice: '',
      search: ''
    });
  };

  if (loading) {
    return <div className="loading">Loading listings...</div>;
  }

  return (
    <div className="listings-container">
      <div className="listings-header">
        <h1>Browse Listings</h1>
        <p>Find the perfect item to rent</p>
      </div>

      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search</label>
            <div className="search-bar-container">
              <input
                type="text"
                name="search"
                placeholder="Search listings..."
                value={filters.search}
                onChange={handleFilterChange}
                className="search-input"
              />
              <button
                type="button"
                className="search-btn"
                onClick={() => fetchListings()}
              >
                🔍
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="vehicles">Vehicles</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="property">Property</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter city..."
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label>Min Price</label>
            <input
              type="number"
              name="minPrice"
              placeholder="0"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label>Max Price</label>
            <input
              type="number"
              name="maxPrice"
              placeholder="1000"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="listings-grid">
        {listings.length === 0 ? (
          <div className="no-listings">
            <h3>No listings found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          listings.map(listing => (
            <div key={listing._id} className="listing-card">
              <div className="listing-image">
                {listing.images && listing.images.length > 0 ? (
                  <img src={`http://localhost:5000${listing.images[0].url}`} alt={listing.images[0].alt || listing.title} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>

              <div className="listing-info">
                <h3>
                  <Link to={`/listings/${listing._id}`}>{listing.title}</Link>
                </h3>
                <p className="category">{listing.category}</p>
                <p className="location">{listing.location?.city || 'Location not specified'}</p>
                <p className="price">Rs {listing.price}/{listing.rentalPeriod === 'monthly' ? 'month' : 'day'}</p>
                <p className="description">{listing.description.substring(0, 100)}...</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Listings;
