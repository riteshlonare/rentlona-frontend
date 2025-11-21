import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || ''
    });
    setLoading(false);
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await usersAPI.updateProfile(formData);
      updateUser(response.data);
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || ''
    });
    setEditing(false);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        {!editing && (
          <button onClick={() => setEditing(true)} className="edit-btn">
            Edit Profile
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="profile-content">
        {!editing ? (
          <div className="profile-view">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>

            <div className="profile-info">
              <div className="info-section">
                <h3>Basic Information</h3>
                <div className="info-item">
                  <label>Name:</label>
                  <span>{user?.name || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{user?.email}</span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{user?.phone || 'Not provided'}</span>
                </div>
              </div>

              <div className="info-section">
                <h3>About</h3>
                <div className="info-item">
                  <label>Bio:</label>
                  <span>{user?.bio || 'No bio added yet'}</span>
                </div>
              </div>

              <div className="info-section">
                <h3>Account Details</h3>
                <div className="info-item">
                  <label>Member since:</label>
                  <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
                </div>
                <div className="info-item">
                  <label>Account status:</label>
                  <span className="status-active">Active</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-edit">
            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>About You</h3>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell others about yourself..."
                  rows="4"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
