import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listingsAPI, messagesAPI, usersAPI } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import './ListingDetail.css';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // Generate threadId for messaging
  const generateThreadId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('_');
  };

  const fetchListing = useCallback(async () => {
    try {
      const response = await listingsAPI.getById(id);
      setListing(response.data);
    } catch (error) {
      setError('Failed to load listing details');
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const checkIfFavorite = useCallback(async () => {
    if (!user) return;
    try {
      const response = await usersAPI.getFavorites();
      const favorites = response.data;
      setIsFavorite(favorites.some(fav => fav._id === id));
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  }, [user, id]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  useEffect(() => {
    checkIfFavorite();
  }, [checkIfFavorite]);

  if (loading) {
    return <div className="loading">Loading listing details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!listing) {
    return <div className="not-found">Listing not found</div>;
  }

  return (
    <div className="listing-detail-container">
      <div className="listing-detail-header">
        <Link to="/listings" className="back-link">← Back to Listings</Link>
        <h1>{listing.title}</h1>
      </div>

      <div className="listing-detail-content">
        <div className="listing-images">
          {listing.images && listing.images.length > 0 ? (
            listing.images.map((image, index) => (
              <img key={index} src={`http://localhost:5000${image.url}`} alt={image.alt || listing.title} />
            ))
          ) : (
            <div className="no-image">No images available</div>
          )}
        </div>

        <div className="listing-info">
          <div className="listing-price">
            <span className="price">Rs {listing.price}</span>
            <span className="per-day">per {listing.rentalPeriod === 'monthly' ? 'month' : 'day'}</span>
          </div>

          <div className="listing-meta">
            <div className="meta-item">
              <strong>Category:</strong> {listing.category}
            </div>
            <div className="meta-item">
              <strong>Location:</strong> {listing.location?.city || 'Not specified'}
            </div>
            <div className="meta-item">
              <strong>Status:</strong> {listing.status}
            </div>
            <div className="meta-item">
              <strong>Listed by:</strong> {listing.user?.name || 'Unknown'}
            </div>
            <div className="meta-item">
              <strong>Contact Number:</strong> {listing.contactNumber || 'Not provided'}
            </div>
          </div>

          <div className="listing-description">
            <h3>Description</h3>
            <p>{listing.description}</p>
          </div>

          {listing.specifications && Object.keys(listing.specifications).length > 0 && (
            <div className="listing-specifications">
              <h3>Specifications</h3>
              <div className="specs-grid">
                {Object.entries(listing.specifications).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="listing-actions">
            {user && user._id !== listing.user?._id && (
              <button
                className="contact-btn"
                onClick={async () => {
                  if (!message.trim()) {
                    alert('Please enter a message');
                    return;
                  }
                  setSendingMessage(true);
                  try {
                    const threadId = generateThreadId(user._id, listing.user._id);
                    await messagesAPI.send({
                      recipientId: listing.user._id,
                      content: message,
                      threadId
                    });
                    setMessage('');
                    alert('Message sent successfully!');
                  } catch (error) {
                    alert('Failed to send message');
                  } finally {
                    setSendingMessage(false);
                  }
                }}
                disabled={sendingMessage}
              >
                {sendingMessage ? 'Sending...' : 'Contact Owner'}
              </button>
            )}
            {user && (
              <button
                className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                onClick={async () => {
                  if (!user) {
                    alert('Please log in to add favorites');
                    return;
                  }
                  setFavoritesLoading(true);
                  try {
                    if (isFavorite) {
                      await usersAPI.removeFromFavorites(id);
                      setIsFavorite(false);
                      alert('Removed from favorites');
                    } else {
                      await usersAPI.addToFavorites(id);
                      setIsFavorite(true);
                      alert('Added to favorites');
                    }
                  } catch (error) {
                    alert('Failed to update favorites');
                  } finally {
                    setFavoritesLoading(false);
                  }
                }}
                disabled={favoritesLoading}
              >
                {favoritesLoading ? 'Updating...' : (isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites')}
              </button>
            )}
          </div>

          {user && user._id !== listing.user?._id && (
            <div className="message-form">
              <h4>Send a message to the owner</h4>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi, I'm interested in renting this item..."
                rows="3"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
