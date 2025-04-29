
import { Link } from "react-router-dom";
import { getCategories } from "../data/products";

const Categories = () => {
  const categories = getCategories();
  
  const categoryImages = {
    bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070",
    furniture: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070",
    living: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974",
    lighting: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070",
    decor: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1916",
    kitchen: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070",
    bathroom: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070",
  };

  return (
    <div>
      <h1 className="font-poppins font-bold text-3xl mb-2">Product Categories</h1>
      <p className="text-gray-600 mb-8">
        Explore our wide range of product categories
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            key={category} 
            to={`/products?category=${category}`}
            className="group relative overflow-hidden rounded-lg hover-scale"
          >
            <div className="aspect-[3/2] overflow-hidden">
              <img 
                src={categoryImages[category] || "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070"}
                alt={category}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h2 className="font-poppins font-semibold text-2xl capitalize mb-1">{category}</h2>
                <p className="text-sm opacity-75">Shop Now</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
