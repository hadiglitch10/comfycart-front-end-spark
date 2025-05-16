import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type NavbarProps = {
  toggleCart: () => void;
};

const Navbar = ({ toggleCart }: NavbarProps) => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pic = localStorage.getItem("profilePic") || sessionStorage.getItem("profilePic");
    setProfilePic(pic);
  }, []);

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

  // Hide login/signup on those pages
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="font-poppins font-bold text-xl">hadiCart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/products" className="font-medium hover:text-primary transition-colors">Products</Link>
            {isLoggedIn && <Link to="/dashboard" className="font-medium hover:text-primary transition-colors">Dashboard</Link>}
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
                  {profilePic ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profilePic} alt={user?.name || "User"} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      {profilePic ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profilePic} alt={user?.name || "User"} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user?.name}</span>
                        <span className="text-xs text-gray-500">{user?.email}</span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
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
            
            {isLoggedIn && (
              <button onClick={toggleCart} className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {isLoggedIn && (
              <button onClick={toggleCart} className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
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
                  <Link to="/dashboard" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>Dashboard</Link>
                  <Link to="/profile" className="font-medium hover:text-primary transition-colors" onClick={toggleMenu}>My Profile</Link>
                  <button 
                    className="text-left font-medium hover:text-primary transition-colors flex items-center" 
                    onClick={() => {
                      logout();
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
