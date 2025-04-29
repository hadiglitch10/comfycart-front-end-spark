
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

export type CartProduct = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

type CartContextType = {
  cart: CartProduct[];
  addToCart: (product: Omit<CartProduct, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    setCartTotal(cart.reduce((total, item) => total + (item.price * item.quantity), 0));
  }, [cart]);

  const addToCart = (product: Omit<CartProduct, 'quantity'>) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      
      if (existingProduct) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
