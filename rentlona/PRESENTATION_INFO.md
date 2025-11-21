# RentLONA.com - Comprehensive Rental Platform

## Project Overview

RentLONA.com is a full-stack web application that serves as a comprehensive rental platform, allowing users to rent various items including real estate, vehicles, electronics, furniture, clothing, services, hobbies, and pets.

## Tech Stack

### Backend
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs for password hashing
- **File Upload**: Multer middleware for image handling
- **Real-time Communication**: Socket.io for messaging
- **Environment**: dotenv for configuration
- **Testing**: Jest with Supertest

### Frontend
- **Framework**: React.js with React Router for navigation
- **HTTP Client**: Axios for API calls
- **Styling**: CSS with responsive design
- **State Management**: React Context API for authentication
- **Testing**: Jest with React Testing Library

## Key Features

### User Management
- User registration and login with JWT authentication
- Profile management
- Secure password hashing

### Listing Management
- Create, read, update, delete listings
- Multiple categories: Property, Vehicles, Electronics, Furniture, Clothing
- Image upload (up to 5 images per listing, 5MB limit)
- Location-based listings with address and coordinates
- Search and filtering capabilities
- Favorites system

### Communication
- Real-time messaging between users via Socket.io
- Conversation threads
- Message read status

### UI/UX
- Responsive design for mobile and desktop
- Modern, clean interface
- Smooth animations with AOS library
- Intuitive navigation

## Project Structure

```
rentlona/
├── backend/
│   ├── models/           # MongoDB schemas (User, Listing, Message, Category)
│   ├── routes/           # API endpoints (auth, listings, messages, users)
│   ├── middleware/       # Authentication and upload middleware
│   ├── tests/            # Backend unit tests
│   ├── server.js         # Main server file with Socket.io integration
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components (Header, Footer, etc.)
│   │   ├── pages/        # Page components (Home, Login, Listings, etc.)
│   │   ├── contexts/     # React Context for authentication
│   │   ├── services/     # API service functions
│   │   └── App.js        # Main app component with routing
│   ├── public/           # Static assets
│   └── package.json
└── README.md
```

## Database Models

### User Model
- Personal information (name, email, password)
- Profile details (phone, avatar, bio)
- Favorites array for saved listings
- Account status and timestamps

### Listing Model
- Basic info (title, description, category, price)
- Location data (address, city, coordinates)
- Images array with URLs and alt text
- Specifications object for category-specific details
- User reference and status tracking

### Message Model
- Sender and receiver references
- Message content and timestamps
- Read status and conversation threading

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /me` - Get current user info

### Listings (`/api/listings`)
- `GET /` - Get all listings with filtering
- `GET /:id` - Get specific listing
- `POST /` - Create new listing (authenticated)
- `PUT /:id` - Update listing (owner only)
- `DELETE /:id` - Delete listing (owner only)
- `GET /user` - Get user's listings
- `POST /upload` - Upload images for listings

### Messages (`/api/messages`)
- `GET /` - Get user's messages
- `GET /conversations` - Get conversation list
- `GET /thread/:id` - Get conversation thread
- `POST /` - Send message
- `PUT /read/:id` - Mark thread as read

### Users (`/api/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update profile
- `POST /favorites/:id` - Add to favorites
- `DELETE /favorites/:id` - Remove from favorites
- `GET /favorites` - Get favorite listings

## Image Upload System

### Backend Implementation
- **Multer Configuration**: Disk storage with unique filenames
- **File Filter**: Only image files allowed (jpeg, png, gif, etc.)
- **Size Limit**: 5MB per image, up to 5 images per listing
- **Storage**: Local `uploads/` directory with static serving
- **Security**: Filename sanitization and path validation

### Frontend Integration
- **File Selection**: Multiple file input with preview
- **Automatic Upload**: Images uploaded immediately on selection
- **Progress Tracking**: Upload progress indicators
- **Error Handling**: Failed upload notifications
- **Integration**: Image URLs included in listing creation

## Authentication System

### JWT Implementation
- **Token Generation**: Issued on successful login/register
- **Token Verification**: Middleware checks for valid tokens
- **Token Storage**: LocalStorage on frontend
- **Auto-login**: Token verification on app load
- **Secure Routes**: Protected endpoints require authentication

### Context Management
- **AuthContext**: Global state for user authentication
- **Login/Register**: API calls with token storage
- **Logout**: Token removal and state cleanup
- **Loading States**: UI feedback during auth operations

## Real-time Features

### Socket.io Integration
- **Connection Management**: User-specific rooms
- **Message Events**: Real-time message delivery
- **Typing Indicators**: Live typing status (potential enhancement)
- **Online Status**: User presence tracking (potential enhancement)

## Testing Strategy

### Backend Tests
- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing with Supertest
- **Authentication Tests**: Token validation and protected routes
- **Database Tests**: Model operations and data validation

### Frontend Tests
- **Component Tests**: UI component rendering and interactions
- **Integration Tests**: Page-level functionality
- **API Mocking**: Axios mocking for isolated testing
- **User Flow Tests**: Complete user journeys

## Deployment Considerations

### Environment Setup
- **Environment Variables**: Separate configs for dev/prod
- **Database**: MongoDB Atlas for production
- **File Storage**: Cloud storage (AWS S3, Cloudinary) for images
- **SSL**: HTTPS configuration for security

### Production Optimizations
- **Build Process**: Minification and bundling
- **Caching**: Static asset caching
- **CDN**: Content delivery network for global access
- **Monitoring**: Error tracking and performance monitoring

## Development Status

### Completed Features ✅
- Full-stack application setup
- User authentication system
- CRUD operations for listings
- Image upload functionality
- Real-time messaging
- Responsive UI design
- Search and filtering
- Favorites system
- Profile management

### Remaining Tasks 📋
- Comprehensive testing suite
- Production deployment
- Advanced features (payments, reviews, etc.)

## Getting Started

1. **Prerequisites**: Node.js, MongoDB, npm
2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. **Environment**: Create `.env` files with required variables
5. **Database**: Ensure MongoDB is running locally or configure cloud instance

## Future Enhancements

- Payment integration (Stripe, PayPal)
- Review and rating system
- Advanced search with geolocation
- Mobile app development
- Admin dashboard
- Analytics and reporting
- Email notifications
- Social login options

This project demonstrates modern full-stack development practices with a focus on user experience, security, and scalability. The modular architecture allows for easy maintenance and future feature additions.
