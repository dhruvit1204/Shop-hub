import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logout successful!');
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserOpen(!isUserOpen);

  const categories = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];
  const productSubcategories = [
    { name: "Fashion", path: "/category/fashion" },
    { name: "Electronics", path: "/category/electronics" },
    { name: "Home & Kitchen", path: "/category/home" },
    { name: "Beauty & Personal Care", path: "/category/beauty" },
    { name: "Toys", path: "/category/toys" },
  ];

  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const productDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProductDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target as Node)) {
        setIsProductDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProductDropdownOpen]);

  const [cartItems, setCartItems] = useState<any[]>(() => {
    const userData = localStorage.getItem('user');
    if (!userData) return [];
    const user = JSON.parse(userData);
    const key = `cartItems_${user.email}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  });

  // Sync cart for current user
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }
    const key = `cartItems_${user.email}`;
    const handleCartUpdate = () => {
      const stored = localStorage.getItem(key);
      setCartItems(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    handleCartUpdate();
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [user]);

  // Persist cart for current user
  useEffect(() => {
    if (!user) return;
    const key = `cartItems_${user.email}`;
    localStorage.setItem(key, JSON.stringify(cartItems));
  }, [cartItems, user]);

  const [wishlist, setWishlist] = useState<any[]>(() => {
    const userData = localStorage.getItem('user');
    if (!userData) return [];
    const user = JSON.parse(userData);
    const key = `wishlist_${user.email}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  });

  // Sync wishlist for current user
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }
    const key = `wishlist_${user.email}`;
    const handleWishlistUpdate = () => {
      const stored = localStorage.getItem(key);
      setWishlist(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    handleWishlistUpdate();
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [user]);

  // Persist wishlist for current user
  useEffect(() => {
    if (!user) return;
    const key = `wishlist_${user.email}`;
    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist, user]);

  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const handleRemoveWishlistItem = (id: number) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(updated));
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/60 backdrop-blur-sm shadow-lg border-b border-primary/20 py-4">
      <div className="container flex items-center justify-between font-sans uppercase text-sm tracking-wide">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-serif font-bold text-primary">ShopHub</span>
          </Link>
        </div>

        {!isMobile && (
          <div className="hidden md:flex items-center space-x-6">
            {/* Home */}
            <Link to="/" className="text-foreground/70 hover:text-primary transition-colors font-medium">Home</Link>
            {/* Products Dropdown */}
            <div className="relative" ref={productDropdownRef}>
              <button
                className="text-foreground/70 hover:text-primary transition-colors font-medium focus:outline-none"
                onClick={() => setIsProductDropdownOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={isProductDropdownOpen}
              >
                PRODUCTS
              </button>
              {isProductDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-background/90 backdrop-blur-sm shadow-lg rounded-md border border-primary/20 z-50 animate-fade-in">
                  {productSubcategories.map((sub) => (
                    <Link key={sub.name} to={sub.path} className="block px-4 py-2 hover:bg-primary/10 hover:text-primary rounded-md transition-colors" onClick={() => setIsProductDropdownOpen(false)}>
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* About Us */}
            <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors font-medium">About Us</Link>
            {/* Contact Us */}
            <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors font-medium">Contact Us</Link>
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="relative group" onClick={() => setShowWishlistDropdown((prev) => !prev)} aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
            {/* Wishlist Dropdown */}
            {showWishlistDropdown && wishlist.length > 0 && (
              <div className="absolute right-0 mt-2 w-64 bg-card shadow-lg rounded-md border z-50 animate-fade-in p-3">
                <div className="font-semibold mb-2">Wishlist</div>
                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 border-b pb-2 last:border-b-0 last:pb-0">
                      <img src={item.image || '/placeholder.png'} alt={item.name} className="w-10 h-10 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-medium text-sm truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground">₹{item.price}</div>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => handleRemoveWishlistItem(item.id)} aria-label="Remove from wishlist">
                        <span className="text-red-500">&times;</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleUserMenu}
              className="relative"
            >
              <User className="h-5 w-5" />
            </Button>
            {isUserOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-background/90 backdrop-blur-sm shadow-lg rounded-md border border-primary/20 z-50 animate-fade-in">
                <div className="py-2 px-4">
                  {user ? (
                    <>
                      <div className="mb-2 text-center">
                        <div className="font-bold">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mb-2"
                        onClick={() => { setIsUserOpen(false); window.location.href = '/profile'; }}
                      >
                        Profile
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full mb-2"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full mb-2"
                        onClick={() => window.auth_modal.showModal()}
                      >
                        Login
                      </Button>
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={() => window.signup_modal.showModal()}
                      >
                        Signup
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background/70 backdrop-blur-sm z-40 animate-fade-in">
          <div className="container py-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Link to="/" className="py-2 px-4 text-foreground border-b" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <details className="group">
                <summary className="cursor-pointer py-2 px-4 text-foreground/80 hover:text-foreground border-b outline-none">Products</summary>
                <div className="flex flex-col pl-4">
                  {productSubcategories.map((sub) => (
                    <Link key={sub.name} to={sub.path} className="py-2 px-2 text-foreground/80 hover:text-foreground" onClick={() => setIsMenuOpen(false)}>
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </details>
              <Link to="/about" className="py-2 px-4 text-foreground border-b" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="py-2 px-4 text-foreground border-b" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </nav>
  );
}
