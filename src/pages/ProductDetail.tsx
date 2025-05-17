import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const foundProduct = products.find((p: Product) => p._id === id);
    setProduct(foundProduct || null);
  }, [id]);

  // Get all reviews for this product from sessionStorage (for all users)
  function getAllProductReviews(productId: string) {
    const reviews: any[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('reviews_')) {
        try {
          const userReviews = JSON.parse(sessionStorage.getItem(key) || '[]');
          userReviews.forEach((r: any) => {
            if (r.productId === productId) {
              reviews.push(r);
            }
          });
        } catch {}
      }
    }
    return reviews;
  }

  const allProductReviews = product ? getAllProductReviews(product._id) : [];
  const averageRating = allProductReviews.length > 0
    ? (allProductReviews.reduce((sum, r) => sum + r.rating, 0) / allProductReviews.length).toFixed(1)
    : null;

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
        id: product._id,
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

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!user) {
      setError("You must be logged in to leave a review.");
      return;
    }
    if (rating < 1 || rating > 5) {
      setError("Please select a rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please enter a comment.");
      return;
    }
    const userReviewsKey = user.email ? `reviews_${user.email}` : "reviews_guest";
    const savedReviews = sessionStorage.getItem(userReviewsKey);
    const reviews = savedReviews ? JSON.parse(savedReviews) : [];
    const newReview = {
      id: Date.now().toString(),
      productId: product._id,
      productName: product.title,
      rating,
      comment,
      date: new Date().toISOString(),
    };
    sessionStorage.setItem(userReviewsKey, JSON.stringify([newReview, ...reviews]));
    setSuccess("Review submitted!");
    setRating(0);
    setComment("");
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

      <div className="mt-10">
        {/* Average rating and review count */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-lg font-semibold">Rating:</span>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className={`h-5 w-5 ${averageRating && star <= Math.round(Number(averageRating)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          {averageRating ? (
            <span className="text-base text-gray-700 ml-2">{averageRating} / 5</span>
          ) : (
            <span className="text-base text-gray-500 ml-2">No ratings yet</span>
          )}
          <span className="text-sm text-gray-500 ml-4">({allProductReviews.length} review{allProductReviews.length === 1 ? '' : 's'})</span>
        </div>

        {/* Reviews List */}
        {allProductReviews.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
            <div className="space-y-6">
              {allProductReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 stroke-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
        {user ? (
          <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block mb-1 font-medium">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={star <= rating ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.37-3.905a1 1 0 00-1.176 0l-5.37 3.905c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118L2.342 11.717c-.783-.57-.38-1.81.588-1.81h6.631a1 1 0 00.95-.69l2.036-6.29z"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                rows={4}
                placeholder="Share your thoughts about this product..."
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <Button type="submit" className="w-full">Submit Review</Button>
          </form>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">Please log in to leave a review.</p>
            <Button asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
