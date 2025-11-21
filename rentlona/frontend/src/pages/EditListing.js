import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listingsAPI } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import './CreateListing.css';

const EditListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    rentalPeriod: 'daily',
    location: '',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchListing = async () => {
      try {
        const response = await listingsAPI.getById(id);
        const listing = response.data;

        // Check if user owns this listing
        if (listing.user._id !== user._id) {
          navigate('/dashboard');
          return;
        }

        setFormData({
          title: listing.title,
          description: listing.description,
          category: listing.category,
          price: listing.price,
          rentalPeriod: listing.rentalPeriod || 'daily',
          location: JSON.stringify(listing.location),
          images: listing.images || []
        });
        setExistingImages(listing.images || []);
      } catch (error) {
        console.error('Error fetching listing:', error);
        navigate('/dashboard');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchListing();
  }, [id, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length + existingImages.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const formDataUpload = new FormData();
    files.forEach(file => {
      formDataUpload.append('images', file);
    });

    try {
      const response = await listingsAPI.uploadImages(formDataUpload);
      setImages(prev => [...prev, ...response.data.images]);
    } catch (error) {
      alert('Failed to upload images');
    }
  };

  const removeImage = (index, type) => {
    if (type === 'new') {
      setImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const allImages = [...existingImages, ...images];
      const listingData = {
        ...formData,
        images: allImages
      };

      await listingsAPI.update(id, listingData);
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to update listing');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="loading">Loading listing...</div>;
  }

  return (
    <div className="create-listing-container">
      <div className="create-listing-form">
        <h2>Edit Listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Furniture">Furniture</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Sports">Sports</option>
              <option value="Tools">Tools</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (Rs) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Rental Period *</label>
            <div className="rental-period-toggle">
              <button
                type="button"
                className={`period-btn ${formData.rentalPeriod === 'daily' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, rentalPeriod: 'daily' }))}
              >
                Per Day
              </button>
              <button
                type="button"
                className={`period-btn ${formData.rentalPeriod === 'monthly' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, rentalPeriod: 'monthly' }))}
              >
                Per Month
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder='{"city": "Mumbai", "state": "Maharashtra"}'
              required
            />
          </div>

          <div className="form-group">
            <label>Images (Max 5)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="image-preview">
              {existingImages.map((image, index) => (
                <div key={`existing-${index}`} className="image-item">
                  <img src={`http://localhost:5000${image.url}`} alt={image.alt} />
                  <button
                    type="button"
                    onClick={() => removeImage(index, 'existing')}
                    className="remove-image"
                  >
                    ×
                  </button>
                </div>
              ))}
              {images.map((image, index) => (
                <div key={`new-${index}`} className="image-item">
                  <img src={`http://localhost:5000${image.url}`} alt={image.alt} />
                  <button
                    type="button"
                    onClick={() => removeImage(index, 'new')}
                    className="remove-image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Updating...' : 'Update Listing'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
