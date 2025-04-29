
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = getProductById(productId);
  
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="font-poppins font-semibold text-2xl mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    }
    
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart.`,
      duration: 2000,
    });
  };

  return (
    <div>
      <div className="mb-4">
        <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
          ← Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 capitalize mb-1">{product.category}</p>
            <h1 className="font-poppins font-semibold text-3xl">{product.title}</h1>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating.rate)
                        ? "fill-yellow-400 stroke-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div>
            <p className="text-3xl font-semibold">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-1">Tax included. Shipping calculated at checkout.</p>
          </div>

          <div>
            <h2 className="font-medium mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div>
            <h2 className="font-medium mb-3">Quantity</h2>
            <div className="flex items-center border rounded-md w-32">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <Button 
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium h-12"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>

          <div className="border-t pt-6">
            <h2 className="font-medium mb-2">Shipping & Returns</h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Free shipping on orders over $50</li>
              <li>• Standard shipping: 3-5 business days</li>
              <li>• Express shipping: 1-2 business days</li>
              <li>• 30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
