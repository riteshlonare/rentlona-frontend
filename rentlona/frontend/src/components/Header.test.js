import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

test('renders RentLONA.com logo', () => {
  renderHeader();
  const logoElement = screen.getByText(/RentLONA\.com/i);
  expect(logoElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  renderHeader();
  expect(screen.getByText(/Browse/i)).toBeInTheDocument();
});

test('renders location selector', () => {
  renderHeader();
  expect(screen.getByText(/Select Location/i)).toBeInTheDocument();
});

test('location dropdown can be opened', () => {
  renderHeader();
  const locationBtn = screen.getByText(/Select Location/i);
  fireEvent.click(locationBtn);
  expect(screen.getByText(/Select Your City/i)).toBeInTheDocument();
});
