import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../context/AuthContext";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const userWishlistKey = user?.email ? `wishlist_${user.email}` : "wishlist_guest";
  const [isHovering, setIsHovering] = useState(false);
  const [wishlist, setWishlist] = useState<{ id: string; name: string }[]>([]);
  const isInWishlist = wishlist.some((item) => item.id === product._id);

  useEffect(() => {
    const savedWishlist = sessionStorage.getItem(userWishlistKey);
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
  }, [userWishlistKey]);

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
      duration: 2000,
    });
  };

  const toggleWishlist = () => {
    let updatedWishlist;
    if (isInWishlist) {
      updatedWishlist = wishlist.filter((item) => item.id !== product._id);
      toast({ title: "Removed from wishlist", description: product.title });
    } else {
      updatedWishlist = [...wishlist, { id: product._id, name: product.title }];
      toast({ title: "Added to wishlist", description: product.title });
    }
    setWishlist(updatedWishlist);
    sessionStorage.setItem(userWishlistKey, JSON.stringify(updatedWishlist));
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovering ? "scale-110" : "scale-100"
            }`}
          />
        </Link>
        <button
          className="absolute top-2 left-2 bg-white bg-opacity-80 rounded-full p-1 hover:bg-opacity-100"
          onClick={toggleWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-5 w-5 ${isInWishlist ? "fill-red-500 stroke-red-500" : "stroke-gray-400"}`} />
        </button>
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
            <span className="text-xs font-medium">{product.rating.rate}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 capitalize mb-1">{product.category}</p>
        <Link to={`/products/${product._id}`} className="block">
          <h3 className="font-medium mb-2 hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
