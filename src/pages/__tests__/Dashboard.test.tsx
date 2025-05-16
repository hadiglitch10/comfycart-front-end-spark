import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Dashboard from '../Dashboard';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Dashboard />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Dashboard', () => {
  beforeEach(() => {
    sessionStorageMock.clear();
    localStorageMock.clear();
  });

  it('should render welcome message with user name', () => {
    // Mock user data
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({ email: 'test@test.com', name: 'Test User' })
    );

    renderDashboard();
    expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument();
  });

  it('should display correct counts from sessionStorage', () => {
    // Mock orders data
    sessionStorageMock.getItem.mockImplementation((key) => {
      if (key === 'orders_test@test.com') {
        return JSON.stringify([{ id: 1 }, { id: 2 }]);
      }
      if (key === 'wishlist_test@test.com') {
        return JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }]);
      }
      return null;
    });

    renderDashboard();
    
    expect(screen.getByText('2')).toBeInTheDocument(); // Orders count
    expect(screen.getByText('3')).toBeInTheDocument(); // Wishlist count
  });

  it('should display profile picture if available', () => {
    // Mock profile picture
    localStorageMock.getItem.mockReturnValue('data:image/jpeg;base64,test-image-data');

    renderDashboard();
    
    const profileImage = screen.getByAltText('Profile');
    expect(profileImage).toHaveAttribute('src', 'data:image/jpeg;base64,test-image-data');
  });

  it('should show default user icon when no profile picture', () => {
    renderDashboard();
    
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });

  it('should display correct navigation links', () => {
    renderDashboard();
    
    expect(screen.getByText('My Orders')).toHaveAttribute('href', '/orders');
    expect(screen.getByText('Shopping Cart')).toHaveAttribute('href', '/cart');
    expect(screen.getByText('Wishlist')).toHaveAttribute('href', '/wishlist');
  });

  it('should display recent reviews section', () => {
    // Mock reviews data
    sessionStorageMock.getItem.mockReturnValue(
      JSON.stringify([
        {
          id: '1',
          productId: '1',
          productName: 'Test Product',
          rating: 5,
          comment: 'Great product!',
          date: new Date().toISOString(),
        },
      ])
    );

    renderDashboard();
    
    expect(screen.getByText('Recent Reviews')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Great product!')).toBeInTheDocument();
  });

  it('should show message when no reviews available', () => {
    renderDashboard();
    
    expect(screen.getByText('No reviews yet. Start reviewing your purchased products!')).toBeInTheDocument();
  });
}); 