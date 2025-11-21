# RentLONA.com

A comprehensive rental platform that allows users to rent various items including real estate, vehicles, electronics, furniture, clothing, services, hobbies, and pets.

## Tech Stack

- **Frontend**: React.js with React Router
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS with responsive design
- **Testing**: Jest for backend, React Testing Library for frontend

## Features

- User authentication (registration/login)
- Listing management (create, edit, view)
- Categories: Property, Vehicles, Electronics, Furniture, Clothing
- Search and filtering
- Favorites system
- Messaging between users
- Responsive design

## Project Structure

```
rentlona/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── tests/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.js
│   ├── public/
│   └── package.json
└── README.md
```

## Getting Started

1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Set up MongoDB
5. Start backend: `cd backend && npm start`
6. Start frontend: `cd frontend && npm start`

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/listings` - Listing CRUD operations
- `/api/messages` - Messaging functionality
- `/api/users` - User profile management
