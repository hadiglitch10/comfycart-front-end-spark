import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";

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

// Sample products data
const initialProducts: Product[] = [
  {
    _id: "1",
    title: "Luxe Memory Foam Pillow",
    price: 29.99,
    description: "Memory foam pillow that contours to your head and neck for maximum comfort and support. Hypoallergenic cover included.",
    category: "bedroom",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=2069",
    rating: { rate: 4.8, count: 125 }
  },
  {
    _id: "2",
    title: "Ergonomic Office Chair",
    price: 249.99,
    description: "Fully adjustable office chair with lumbar support, headrest, and breathable mesh back for all-day comfort.",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa?q=80&w=2070",
    rating: { rate: 4.6, count: 89 }
  },
  {
    _id: "3",
    title: "Plush Throw Blanket",
    price: 39.99,
    description: "Ultra-soft microfiber throw blanket, perfect for staying cozy during movie nights or cold evenings.",
    category: "living",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071",
    rating: { rate: 4.9, count: 213 }
  },
  {
    _id: "4",
    title: "Smart LED Desk Lamp",
    price: 59.99,
    description: "Adjustable desk lamp with multiple brightness levels, color temperatures, and a built-in USB charging port.",
    category: "lighting",
    image: "https://images.unsplash.com/photo-1534189021142-638a4250c776?q=80&w=2066",
    rating: { rate: 4.7, count: 76 }
  },
  {
    _id: "5",
    title: "Ceramic Plant Pot Set",
    price: 34.99,
    description: "Set of 3 minimalist ceramic plant pots in varying sizes, perfect for succulents and small indoor plants.",
    category: "decor",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072",
    rating: { rate: 4.5, count: 112 }
  }
];

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "";
  const initialSearchQuery = queryParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.category))];
  
  // Get min and max prices from products
  const minPrice = products.length > 0 ? Math.floor(Math.min(...products.map(p => p.price))) : 0;
  const maxPrice = products.length > 0 ? Math.ceil(Math.max(...products.map(p => p.price))) : 300;
  
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, priceRange, products]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering logic is already handled in the useEffect
  };
  
  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-3xl mb-2">Shop Products</h1>
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="w-full md:w-64 shrink-0 space-y-6 hidden md:block">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-lg">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="h-8 text-sm"
              >
                Clear All
              </Button>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <div 
                  className={`cursor-pointer px-2 py-1 rounded-md ${
                    selectedCategory === "" ? "bg-primary/10 text-primary font-medium" : ""
                  }`}
                  onClick={() => setSelectedCategory("")}
                >
                  All Products
                </div>
                {categories.map((category) => (
                  <div 
                    key={category} 
                    className={`cursor-pointer px-2 py-1 rounded-md capitalize ${
                      selectedCategory === category ? "bg-primary/10 text-primary font-medium" : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  min={minPrice}
                  max={maxPrice}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">to</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </form>
            
            {/* Mobile Filter Button */}
            <Button 
              variant="outline" 
              className="md:hidden flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden bg-gray-50 p-4 rounded-lg mb-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Filters</h2>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-8 text-sm"
                  >
                    Clear All
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("")}
                    className="h-8"
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="h-8 capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">to</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg mb-2">No products found matching your criteria.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
