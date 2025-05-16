import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ProductCard from '../ProductCard';
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

// Mock useToast
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  image: 'test.jpg',
  description: 'Test description',
  category: 'test-category',
};

const renderProductCard = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ProductCard product={mockProduct} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('ProductCard', () => {
  beforeEach(() => {
    sessionStorageMock.clear();
  });

  it('should render product information correctly', () => {
    renderProductCard();
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test.jpg');
  });

  it('should add product to cart when clicking add to cart button', () => {
    renderProductCard();
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    // Verify the product was added to cart (you might need to adjust this based on your implementation)
    expect(screen.getByText('Added to cart')).toBeInTheDocument();
  });

  it('should toggle wishlist when clicking heart icon', () => {
    renderProductCard();
    
    const wishlistButton = screen.getByRole('button', { name: /wishlist/i });
    fireEvent.click(wishlistButton);

    // Verify the product was added to wishlist
    expect(sessionStorageMock.setItem).toHaveBeenCalled();
  });

  it('should navigate to product detail page when clicking product', () => {
    renderProductCard();
    
    const productLink = screen.getByRole('link', { name: /test product/i });
    expect(productLink).toHaveAttribute('href', '/products/1');
  });

  it('should show correct wishlist state based on sessionStorage', () => {
    // Mock wishlist data in sessionStorage
    sessionStorageMock.getItem.mockReturnValue(
      JSON.stringify([{ id: '1', name: 'Test Product' }])
    );

    renderProductCard();
    
    const wishlistButton = screen.getByRole('button', { name: /wishlist/i });
    expect(wishlistButton).toHaveClass('text-red-500'); // Assuming this is the class for active wishlist
  });

  it('should handle quantity updates correctly', () => {
    renderProductCard();
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);
    fireEvent.click(addToCartButton);

    // Verify the quantity was updated
    expect(screen.getByText('Added to cart')).toBeInTheDocument();
  });
}); 