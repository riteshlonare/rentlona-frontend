import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listingsAPI } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import './CreateListing.css';

const CreateListing = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    rentalPeriod: 'daily',
    contactNumber: '',
    location: {
      city: '',
      state: '',
      zipCode: ''
    },
    specifications: {}
  });
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (isEdit) {
      fetchListing();
    }
  }, [id, isEdit]);

  const fetchListing = async () => {
    try {
      const response = await listingsAPI.getById(id);
      const listing = response.data;
      setFormData({
        title: listing.title,
        description: listing.description,
        category: listing.category,
        price: listing.price,
        rentalPeriod: listing.rentalPeriod || 'daily',
        contactNumber: listing.contactNumber,
        location: listing.location,
        specifications: listing.specifications || {}
      });
      setUploadedImages(listing.images || []);
    } catch (error) {
      setError('Failed to load listing');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    if (files.length > 0) {
      setUploadingImages(true);
      try {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        const response = await listingsAPI.uploadImages(formData);
        setUploadedImages(response.data.images);
      } catch (error) {
        setError('Failed to upload images');
      } finally {
        setUploadingImages(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      setError('Please login to create a listing');
      setLoading(false);
      return;
    }

    try {
      const listingData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        rentalPeriod: formData.rentalPeriod,
        contactNumber: formData.contactNumber,
        location: formData.location,
        images: uploadedImages
      };

      if (isEdit) {
        await listingsAPI.update(id, listingData);
      } else {
        await listingsAPI.create(listingData);
      }
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} listing`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-listing-container">
      <div className="create-listing-form">
        <h2>{isEdit ? 'Edit Listing' : 'Create New Listing'}</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter listing title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe your item in detail"
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="vehicles">Vehicles</option>
                  <option value="furniture">Furniture</option>
                  <option value="clothing">Clothing</option>
                  <option value="property">Property</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (Rs) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Rental Period *</label>
              <div className="rental-period-toggle">
                <button
                  type="button"
                  className={`period-btn ${formData.rentalPeriod === 'daily' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, rentalPeriod: 'daily'})}
                >
                  Per Day
                </button>
                <button
                  type="button"
                  className={`period-btn ${formData.rentalPeriod === 'monthly' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, rentalPeriod: 'monthly'})}
                >
                  Per Month
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="Enter your contact number"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Location</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location.city">City *</label>
                <input
                  type="text"
                  id="location.city"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter city"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location.state">State</label>
                <input
                  type="text"
                  id="location.state"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location.zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="location.zipCode"
                  name="location.zipCode"
                  value={formData.location.zipCode}
                  onChange={handleChange}
                  placeholder="Enter ZIP code"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Images</h3>

            <div className="form-group">
              <label htmlFor="images">Upload Images</label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
                multiple
                accept="image/*"
              />
              <small>Upload up to 5 images. First image will be the main image.</small>
            </div>

            {images.length > 0 && (
              <div className="image-preview">
                <h4>Selected Images:</h4>
                <div className="preview-grid">
                  {images.map((image, index) => (
                    <div key={index} className="preview-item">
                      <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
                      <span>{image.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="create-listing-btn" disabled={loading}>
            {loading ? (isEdit ? 'Updating Listing...' : 'Creating Listing...') : (isEdit ? 'Update Listing' : 'Create Listing')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
