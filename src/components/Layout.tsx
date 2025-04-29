
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";

const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar toggleCart={toggleCart} />
      <main className="flex-grow-1 container py-4">
        <Outlet />
      </main>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Layout;
