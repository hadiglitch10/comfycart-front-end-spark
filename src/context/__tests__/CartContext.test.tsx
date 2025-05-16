import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { AuthProvider } from '../AuthContext';
import { vi } from 'vitest';

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

// Test component that uses the cart context
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();

  return (
    <div>
      <div data-testid="cart-count">{cartCount}</div>
      <div data-testid="cart-total">{cartTotal}</div>
      <div data-testid="cart-items">{JSON.stringify(cart)}</div>
      <button onClick={() => addToCart({ id: 1, title: 'Test Product', price: 10, image: 'test.jpg' })}>
        Add to Cart
      </button>
      <button onClick={() => removeFromCart(1)}>Remove from Cart</button>
      <button onClick={() => updateQuantity(1, 2)}>Update Quantity</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

// Wrapper component that provides the context
const renderWithContext = (component: React.ReactNode) => {
  return render(
    <AuthProvider>
      <CartProvider>{component}</CartProvider>
    </AuthProvider>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    sessionStorageMock.clear();
  });

  it('should initialize with empty cart', () => {
    renderWithContext(<TestComponent />);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('[]');
  });

  it('should add item to cart', () => {
    renderWithContext(<TestComponent />);
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('10');
    expect(screen.getByTestId('cart-items')).toHaveTextContent(
      JSON.stringify([{ id: 1, title: 'Test Product', price: 10, image: 'test.jpg', quantity: 1 }])
    );
  });

  it('should remove item from cart', () => {
    renderWithContext(<TestComponent />);
    fireEvent.click(screen.getByText('Add to Cart'));
    fireEvent.click(screen.getByText('Remove from Cart'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('[]');
  });

  it('should update item quantity', () => {
    renderWithContext(<TestComponent />);
    fireEvent.click(screen.getByText('Add to Cart'));
    fireEvent.click(screen.getByText('Update Quantity'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('20');
    expect(screen.getByTestId('cart-items')).toHaveTextContent(
      JSON.stringify([{ id: 1, title: 'Test Product', price: 10, image: 'test.jpg', quantity: 2 }])
    );
  });

  it('should clear cart', () => {
    renderWithContext(<TestComponent />);
    fireEvent.click(screen.getByText('Add to Cart'));
    fireEvent.click(screen.getByText('Clear Cart'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('[]');
  });

  it('should persist cart in localStorage', () => {
    renderWithContext(<TestComponent />);
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'cart_guest',
      JSON.stringify([{ id: 1, title: 'Test Product', price: 10, image: 'test.jpg', quantity: 1 }])
    );
  });
}); 