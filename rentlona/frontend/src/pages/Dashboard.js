import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listingsAPI, messagesAPI, usersAPI } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [listingsRes, messagesRes, favoritesRes] = await Promise.all([
        listingsAPI.getMyListings(),
        messagesAPI.getConversations(),
        usersAPI.getFavorites()
      ]);
      setListings(listingsRes.data);
      setMessages(messagesRes.data);
      setFavorites(favoritesRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserListings = async () => {
    try {
      const response = await listingsAPI.getMyListings();
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };



  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>My Dashboard</h1>
          <nav className="header-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/create-listing" className="nav-link">Post Listings</Link>
          </nav>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <div className="user-info">
            <h3>Welcome back, {user?.name}!</h3>
            <p>{user?.email}</p>
          </div>

          <nav className="dashboard-nav">
            <button
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button
              className={activeTab === 'listings' ? 'active' : ''}
              onClick={() => setActiveTab('listings')}
            >
              📦 My Listings
            </button>
            <button
              className={activeTab === 'messages' ? 'active' : ''}
              onClick={() => setActiveTab('messages')}
            >
              💬 Messages
            </button>
            <button
              className={activeTab === 'favorites' ? 'active' : ''}
              onClick={() => setActiveTab('favorites')}
            >
              ❤️ Favorites
            </button>
            <button
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              ⚙️ Profile Settings
            </button>
          </nav>
        </div>

        <div className="dashboard-main">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-info">
                    <h3>{listings.length}</h3>
                    <p>Total Listings</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-info">
                    <h3>{listings.filter(l => l.status === 'active').length}</h3>
                    <p>Active Listings</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💬</div>
                  <div className="stat-info">
                    <h3>{messages.length}</h3>
                    <p>Messages</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">❤️</div>
                  <div className="stat-info">
                    <h3>{favorites.length}</h3>
                    <p>Favorites</p>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {listings.slice(0, 3).map(listing => (
                    <div key={listing._id} className="activity-item">
                      <div className="activity-icon">📦</div>
                      <div className="activity-content">
                        <p><strong>{listing.title}</strong> - {listing.status}</p>
                        <small>{new Date(listing.createdAt).toLocaleDateString()}</small>
                      </div>
                    </div>
                  ))}
                  {messages.slice(0, 2).map((message, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">💬</div>
                      <div className="activity-content">
                        <p>New message in conversation</p>
                        <small>{new Date(message.lastMessage?.createdAt || Date.now()).toLocaleDateString()}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="messages-section">
              <h2>Messages</h2>
              {messages.length === 0 ? (
                <div className="no-messages">
                  <h3>No messages yet</h3>
                  <p>Your conversations will appear here.</p>
                </div>
              ) : (
                <div className="conversations-list">
                  {messages.map(conversation => (
                    <div key={conversation._id} className="conversation-item">
                      <div className="conversation-avatar">
                        {conversation.participants?.[0]?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="conversation-content">
                        <h4>{conversation.participants?.[0]?.name || 'Unknown User'}</h4>
                        <p>{conversation.lastMessage?.content || 'No messages yet'}</p>
                        <small>{new Date(conversation.lastMessage?.createdAt || Date.now()).toLocaleDateString()}</small>
                      </div>
                      <div className="conversation-actions">
                        <Link to={`/messages/${conversation._id}`} className="view-conversation-btn">
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="favorites-section">
              <h2>My Favorites</h2>
              {favorites.length === 0 ? (
                <div className="no-favorites">
                  <h3>No favorites yet</h3>
                  <p>Items you like will appear here.</p>
                </div>
              ) : (
                <div className="favorites-grid">
                  {favorites.map(listing => (
                    <div key={listing._id} className="listing-card">
                      <div className="listing-image">
                        {listing.images && listing.images.length > 0 ? (
                          <img src={`http://localhost:5000${listing.images[0].url}`} alt={listing.title} />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </div>
                      <div className="listing-info">
                        <h3>{listing.title}</h3>
                        <p className="category">{listing.category}</p>
                        <p className="price">Rs {listing.price}/{listing.rentalPeriod === 'monthly' ? 'month' : 'day'}</p>
                        <div className="listing-actions">
                          <Link to={`/listings/${listing._id}`} className="view-btn">
                            View
                          </Link>
                          <button
                            className="remove-favorite-btn"
                            onClick={async () => {
                              try {
                                await usersAPI.removeFromFavorites(listing._id);
                                setFavorites(favorites.filter(fav => fav._id !== listing._id));
                              } catch (error) {
                                alert('Failed to remove from favorites');
                              }
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="listings-section">
              <div className="section-header">
                <h2>My Listings</h2>
                <Link to="/create-listing" className="create-listing-btn">
                  Create New Listing
                </Link>
              </div>

              {listings.length === 0 ? (
                <div className="no-listings">
                  <h3>You haven't created any listings yet</h3>
                  <p>Start renting out your items by creating your first listing!</p>
                  <Link to="/create-listing" className="create-listing-btn">
                    Create Your First Listing
                  </Link>
                </div>
              ) : (
                <div className="listings-grid">
                  {listings.map(listing => (
                    <div key={listing._id} className="listing-card">
                      <div className="listing-image">
                        {listing.images && listing.images.length > 0 ? (
                          <img src={`http://localhost:5000${listing.images[0].url}`} alt={listing.title} />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </div>

                      <div className="listing-info">
                        <h3>{listing.title}</h3>
                        <p className="category">{listing.category}</p>
                        <p className="price">Rs {listing.price}/{listing.rentalPeriod === 'monthly' ? 'month' : 'day'}</p>
                        <p className="status">Status: {listing.status}</p>
                        <div className="listing-actions">
                          <Link to={`/listings/${listing._id}`} className="view-btn">
                            View
                          </Link>
                          <button
                            className="edit-btn"
                            onClick={() => {
                              navigate(`/edit-listing/${listing._id}`);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={async () => {
                              if (window.confirm('Are you sure you want to delete this listing?')) {
                                try {
                                  await listingsAPI.delete(listing._id);
                                  fetchUserListings(); // Refresh the list
                                } catch (error) {
                                  alert('Failed to delete listing');
                                }
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Profile Settings</h2>
              <div className="profile-form">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={user?.name || ''} readOnly />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user?.email || ''} readOnly />
                </div>
                <p className="profile-note">
                  Profile editing functionality will be available soon.
                </p>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
