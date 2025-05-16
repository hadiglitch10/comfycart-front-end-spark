import { render, screen, fireEvent, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
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

// Test component that uses the auth context
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</div>
      <div data-testid="user-info">{user ? JSON.stringify(user) : 'no-user'}</div>
      <button onClick={() => login({ email: 'test@test.com', name: 'Test User' })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const renderWithAuth = (component: React.ReactNode) => {
  return render(
    <AuthProvider>{component}</AuthProvider>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should initialize with no user', () => {
    renderWithAuth(<TestComponent />);
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    expect(screen.getByTestId('user-info')).toHaveTextContent('no-user');
  });

  it('should login user', () => {
    renderWithAuth(<TestComponent />);
    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    expect(screen.getByTestId('user-info')).toHaveTextContent(
      JSON.stringify({ email: 'test@test.com', name: 'Test User' })
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ email: 'test@test.com', name: 'Test User' })
    );
  });

  it('should logout user', () => {
    renderWithAuth(<TestComponent />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Logout'));

    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    expect(screen.getByTestId('user-info')).toHaveTextContent('no-user');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', 'null');
  });

  it('should load user from localStorage on mount', () => {
    const savedUser = { email: 'test@test.com', name: 'Test User' };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedUser));

    renderWithAuth(<TestComponent />);

    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    expect(screen.getByTestId('user-info')).toHaveTextContent(JSON.stringify(savedUser));
  });
}); 