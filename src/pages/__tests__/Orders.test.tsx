import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Orders from '../Orders';
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

const mockOrders = [
  {
    id: '1',
    items: [
      {
        id: 1,
        title: 'Test Product 1',
        price: 99.99,
        image: 'test1.jpg',
        quantity: 2,
      },
    ],
    total: 199.98,
    date: '2024-03-15T10:00:00.000Z',
    status: 'completed',
  },
  {
    id: '2',
    items: [
      {
        id: 2,
        title: 'Test Product 2',
        price: 49.99,
        image: 'test2.jpg',
        quantity: 1,
      },
    ],
    total: 49.99,
    date: '2024-03-14T15:30:00.000Z',
    status: 'completed',
  },
];

const renderOrders = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Orders />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Orders', () => {
  beforeEach(() => {
    sessionStorageMock.clear();
  });

  it('should display orders when available', () => {
    // Mock orders data
    sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrders));

    renderOrders();
    
    // Check if orders are displayed
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('$199.98')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });

  it('should show message when no orders available', () => {
    renderOrders();
    
    expect(screen.getByText('No orders found.')).toBeInTheDocument();
  });

  it('should display order dates in correct format', () => {
    sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrders));

    renderOrders();
    
    // Check if dates are formatted correctly
    expect(screen.getByText('March 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('March 14, 2024')).toBeInTheDocument();
  });

  it('should display order status', () => {
    sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrders));

    renderOrders();
    
    const statusElements = screen.getAllByText('completed');
    expect(statusElements).toHaveLength(2);
  });

  it('should display correct quantities', () => {
    sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrders));

    renderOrders();
    
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
  });

  it('should display order images', () => {
    sessionStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrders));

    renderOrders();
    
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', 'test1.jpg');
    expect(images[1]).toHaveAttribute('src', 'test2.jpg');
  });

  it('should handle user-specific orders', () => {
    // Mock user-specific orders
    const userOrdersKey = 'orders_test@test.com';
    sessionStorageMock.getItem.mockImplementation((key) => {
      if (key === userOrdersKey) {
        return JSON.stringify(mockOrders);
      }
      return null;
    });

    renderOrders();
    
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });
}); 