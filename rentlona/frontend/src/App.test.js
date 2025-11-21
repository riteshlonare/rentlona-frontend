import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';

test('renders RentLONA.com app without crashing', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
  // Check if the location modal appears initially
  expect(screen.getByText(/Please select your location/i)).toBeInTheDocument();
});

test('renders location selection message', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
  const locationMessage = screen.getByText(/Select your city to explore rental listings near you/i);
  expect(locationMessage).toBeInTheDocument();
});
