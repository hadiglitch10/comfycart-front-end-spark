
import { Link } from "react-router-dom";
import { ShoppingCart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <span className="font-poppins font-bold text-xl">ComfyCart</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your one-stop shop for comfortable and stylish home essentials.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-primary transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-primary transition-colors">Cart</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-poppins font-medium text-lg mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-primary transition-colors">Sign Up</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-primary transition-colors">My Profile</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-poppins font-medium text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-600">123 Comfort Street, Cozy Town, CC 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-600">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-600">support@comfycart.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ComfyCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
