import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, X, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const userOrdersKey = user?.email ? `orders_${user.email}` : "orders_guest";

  const handleCheckout = () => {
    if (cart.length === 0) return;
    // Save order to sessionStorage
    const savedOrders = sessionStorage.getItem(userOrdersKey);
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      total: cartTotal,
      items: cart,
    };
    const updatedOrders = [newOrder, ...orders];
    sessionStorage.setItem(userOrdersKey, JSON.stringify(updatedOrders));

    toast({
      title: "Order placed!",
      description: "Your order has been added to your orders.",
      duration: 3000,
    });
    clearCart();
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="font-poppins font-semibold text-2xl mb-2">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-poppins font-bold text-3xl mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0">
                          <Link to={`/products/${item.id}`}>
                            <img className="h-16 w-16 object-cover rounded" src={item.image} alt={item.title} />
                          </Link>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            <Link to={`/products/${item.id}`} className="hover:text-primary transition-colors">
                              {item.title}
                            </Link>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-gray-400 hover:text-red-500 flex items-center mt-1"
                          >
                            <X className="h-3 w-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center border rounded-md w-24">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Actions */}
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              asChild
              className="text-sm"
            >
              <Link to="/products">
                Continue Shopping
              </Link>
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={clearCart}
              className="text-sm"
            >
              Clear Cart
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="font-poppins font-semibold text-xl mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 mt-3 font-semibold flex justify-between">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-white h-12"
              onClick={handleCheckout}
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Secure payments powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
