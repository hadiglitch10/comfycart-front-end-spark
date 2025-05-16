import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { products } from "../data/products";
import { Link } from "react-router-dom";

interface WishlistItem {
  id: string;
  name: string;
}

const Wishlist: React.FC = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const userWishlistKey = user?.email ? `wishlist_${user.email}` : "wishlist_guest";

  useEffect(() => {
    const savedWishlist = sessionStorage.getItem(userWishlistKey);
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
  }, [userWishlistKey]);

  const wishlistProducts = products.filter((product) =>
    wishlist.some((item) => String(product.id) === item.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <p>No wishlist items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img src={product.image} alt={product.title} className="w-32 h-32 object-cover mb-4" />
              <h3 className="font-semibold mb-2 text-center">{product.title}</h3>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <Link to={`/products/${product.id}`} className="text-primary hover:underline">View Product</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 