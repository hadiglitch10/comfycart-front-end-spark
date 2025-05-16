import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CartSidebar from '../CartSidebar';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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

const renderCartSidebar = (isOpen = true) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <CartSidebar isOpen={isOpen} onClose={() => {}} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('CartSidebar', () => {
  beforeEach(() => {
    sessionStorageMock.clear();
    mockNavigate.mockClear();
  });

  it('should render empty cart message when cart is empty', () => {
    renderCartSidebar();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Add some products to your cart and they\'ll appear here')).toBeInTheDocument();
  });

  it('should not show checkout button when cart is empty', () => {
    renderCartSidebar();
    expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
  });

  it('should show cart items when cart has items', () => {
    // Mock cart context with items
    const mockCart = [
      { id: 1, title: 'Test Product', price: 10, image: 'test.jpg', quantity: 1 }
    ];

    vi.mock('../../context/CartContext', async () => {
      const actual = await vi.importActual('../../context/CartContext');
      return {
        ...actual,
        useCart: () => ({
          cart: mockCart,
          cartTotal: 10,
          removeFromCart: vi.fn(),
          updateQuantity: vi.fn(),
          clearCart: vi.fn(),
        }),
      };
    });

    renderCartSidebar();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  it('should handle checkout process', () => {
    // Mock cart context with items
    const mockCart = [
      { id: 1, title: 'Test Product', price: 10, image: 'test.jpg', quantity: 1 }
    ];

    vi.mock('../../context/CartContext', async () => {
      const actual = await vi.importActual('../../context/CartContext');
      return {
        ...actual,
        useCart: () => ({
          cart: mockCart,
          cartTotal: 10,
          removeFromCart: vi.fn(),
          updateQuantity: vi.fn(),
          clearCart: vi.fn(),
        }),
      };
    });

    renderCartSidebar();
    fireEvent.click(screen.getByText('Checkout'));

    // Verify order was saved to sessionStorage
    expect(sessionStorageMock.setItem).toHaveBeenCalled();
    
    // Verify navigation to orders page
    expect(mockNavigate).toHaveBeenCalledWith('/orders');
  });

  it('should not be visible when isOpen is false', () => {
    renderCartSidebar(false);
    expect(screen.queryByText('Shopping Cart')).not.toBeInTheDocument();
  });
}); 