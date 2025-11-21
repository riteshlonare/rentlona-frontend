 import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

// Listings
export const listingsAPI = {
  getAll: (params) => api.get('/listings', { params }),
  getById: (id) => api.get(`/listings/${id}`),
  create: (data) => api.post('/listings', data),
  update: (id, data) => api.put(`/listings/${id}`, data),
  delete: (id) => api.delete(`/listings/${id}`),
  getMyListings: () => api.get('/listings/user'),
  uploadImages: (formData) => api.post('/listings/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Messages
export const messagesAPI = {
  getAll: () => api.get('/messages'),
  getConversations: () => api.get('/messages/conversations'),
  getByConversation: (conversationId) => api.get(`/messages/thread/${conversationId}`),
  send: (data) => api.post('/messages', data),
  markAsRead: (threadId) => api.put(`/messages/read/${threadId}`),
};

// Users
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  addToFavorites: (listingId) => api.post(`/users/favorites/${listingId}`),
  removeFromFavorites: (listingId) => api.delete(`/users/favorites/${listingId}`),
  getFavorites: () => api.get('/users/favorites'),
};

export default api;
