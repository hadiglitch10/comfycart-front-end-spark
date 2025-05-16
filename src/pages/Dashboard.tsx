import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { User, Star } from "lucide-react";

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
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const userOrdersKey = user?.email ? `orders_${user.email}` : "orders_guest";
  const userWishlistKey = user?.email ? `wishlist_${user.email}` : "wishlist_guest";
  const userReviewsKey = user?.email ? `reviews_${user.email}` : "reviews_guest";

  useEffect(() => {
    const savedOrders = sessionStorage.getItem(userOrdersKey);
    setOrdersCount(savedOrders ? JSON.parse(savedOrders).length : 0);
    const savedWishlist = sessionStorage.getItem(userWishlistKey);
    setWishlistCount(savedWishlist ? JSON.parse(savedWishlist).length : 0);
    const pic = localStorage.getItem("profilePic") || sessionStorage.getItem("profilePic");
    setProfilePic(pic);
    const savedReviews = sessionStorage.getItem(userReviewsKey);
    setReviews(savedReviews ? JSON.parse(savedReviews) : []);
  }, [userOrdersKey, userWishlistKey, userReviewsKey]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-full h-full text-gray-400" />
          )}
        </div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name || "User"}!</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-lg font-semibold mb-2">Orders</div>
          <div className="text-2xl font-bold">{ordersCount}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-lg font-semibold mb-2">Wishlist</div>
          <div className="text-2xl font-bold">{wishlistCount}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-lg font-semibold mb-2">Cart</div>
          <div className="text-2xl font-bold">{cartCount}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-lg font-semibold mb-2">Reviews</div>
          <div className="text-2xl font-bold">{reviews.length}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <Link to="/orders" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">My Orders</Link>
        <Link to="/cart" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors">Shopping Cart</Link>
        <Link to="/wishlist" className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors">Wishlist</Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{review.productName}</h3>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet. Start reviewing your purchased products!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 