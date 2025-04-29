
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products, getCategories } from "../data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const categories = getCategories();

  useEffect(() => {
    // Get 4 random products with a rating of at least 4.5
    const highRated = products
      .filter(product => product.rating.rate >= 4.5)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    
    setFeaturedProducts(highRated);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gray-50 rounded-2xl overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="font-poppins font-bold text-4xl md:text-5xl leading-tight">
                Make Your Home <span className="text-primary">Comfortable</span> & Stylish
              </h1>
              <p className="text-gray-600 text-lg">
                Discover our curated collection of comfortable and stylish home essentials that will transform your space.
              </p>
              <div className="flex gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white" size="lg" asChild>
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button variant="outline-primary" size="lg" asChild>
                  <Link to="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=2076"
                alt="Comfortable living room"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="font-medium text-primary">Special Offer</p>
                <p className="text-2xl font-bold">20% OFF</p>
                <p className="text-sm text-gray-600">On selected items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-poppins font-semibold text-2xl mb-2">Featured Products</h2>
            <p className="text-gray-600">Our most popular and highest-rated items</p>
          </div>
          <Link to="/products" className="text-primary font-medium hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="font-poppins font-semibold text-2xl mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 text-center transition-colors"
            >
              <div className="font-medium capitalize">{category}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-primary text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-4">
          Subscribe & Get 10% Off Your First Order
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join our newsletter for exclusive offers, new arrivals, and home decor inspiration.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none"
          />
          <Button className="bg-white text-primary hover:bg-gray-100">Subscribe</Button>
        </form>
      </section>
    </div>
  );
};

export default Home;
