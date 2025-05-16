import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type NavbarProps = {
  toggleCart: () => void;
};

const Navbar = ({ toggleCart }: NavbarProps) => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const name = localStorage.getItem("userName") || sessionStorage.getItem("userName");
    setIsLoggedIn(!!token);
    setUserName(name || "");
  }, [location.pathname]); // Re-check when path changes (like after login/logout)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    
    // Update state
    setIsLoggedIn(false);
    setUserName("");
    
    // Navigate to home
    navigate("/");
  };

  // Hide login/signup on those pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="font-poppins font-bold text-xl">ComfyCart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/products" className="font-medium hover:text-primary transition-colors">Products</Link>
            <Link to="/categories" className="font-medium hover:text-primary transition-colors">Categories</Link>
          </nav>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3">
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  !isAuthPage && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/login" className="w-full">Login</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/signup" className="w-full">Sign Up</Link>
                      </DropdownMenuItem>
                    </>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button onClick={toggleCart} className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleCart} className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <form onSubmit={handleSearch} className="flex items-center relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>Home</Link>
              <Link to="/products" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>Products</Link>
              <Link to="/categories" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>Categories</Link>
              
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>My Profile</Link>
                  <button 
                    className="text-left font-medium hover:text-primary transition-colors flex items-center" 
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </button>
                </>
              ) : (
                !isAuthPage && (
                  <>
                    <Link to="/login" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>Login</Link>
                    <Link to="/signup" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>Sign Up</Link>
                  </>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
