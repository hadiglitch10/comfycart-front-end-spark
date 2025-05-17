import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShoppingCart, Package, Star, Heart } from "lucide-react";

interface Review {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const [ordersCount, setOrdersCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const userOrdersKey = user?.email ? `orders_${user.email}` : "orders_guest";
  const userWishlistKey = user?.email ? `wishlist_${user.email}` : "wishlist_guest";
  const userReviewsKey = user?.email ? `reviews_${user.email}` : "reviews_guest";

  useEffect(() => {
    const savedOrders = sessionStorage.getItem(userOrdersKey);
    setOrdersCount(savedOrders ? JSON.parse(savedOrders).length : 0);
    const savedWishlist = sessionStorage.getItem(userWishlistKey);
    setWishlistCount(savedWishlist ? JSON.parse(savedWishlist).length : 0);
    const savedReviews = sessionStorage.getItem(userReviewsKey);
    setReviews(savedReviews ? JSON.parse(savedReviews) : []);
  }, [userOrdersKey, userWishlistKey, userReviewsKey]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
          <Button asChild>
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/cart" className="block">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Cart</h2>
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{cartCount} items</p>
          </div>
        </Link>

        <Link to="/orders" className="block">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Orders</h2>
              <Package className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{ordersCount} orders</p>
          </div>
        </Link>

        <Link to="/wishlist" className="block">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Wishlist</h2>
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{wishlistCount} items</p>
          </div>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Reviews</h2>
            <Star className="h-6 w-6 text-primary" />
          </div>
          <p className="text-2xl font-bold">{reviews.length} reviews</p>
        </div>
      </div>

      {/* Recent Reviews Section */}
      {reviews.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          <div className="grid gap-4">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{review.productName}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                <span className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 