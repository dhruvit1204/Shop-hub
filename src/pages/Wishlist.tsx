import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) return;
    const user = JSON.parse(userData);
    const key = `wishlist_${user.email}`;
    const stored = localStorage.getItem(key);
    setWishlist(stored ? JSON.parse(stored) : []);
  }, []);

  const handleRemove = (id: number) => {
    const userData = localStorage.getItem('user');
    if (!userData) return;
    const user = JSON.parse(userData);
    const key = `wishlist_${user.email}`;
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  if (wishlist.length === 0) {
    return (
      <div className="container py-16 text-center">
        <Heart className="mx-auto h-16 w-16 text-pink-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="mb-6">Add products to your wishlist to view them here.</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map(item => (
          <div key={item.id} className="border rounded-lg p-4 bg-card shadow-sm flex flex-col">
            <Link to={`/product/${item.id}`} className="flex-1 flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover mb-4 rounded" />
              <h2 className="font-semibold text-lg mb-2 text-center">{item.name}</h2>
              <p className="mb-2 text-primary font-bold">₹{item.price}</p>
            </Link>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" className="flex-1" onClick={() => handleRemove(item.id)}>
                Remove
              </Button>
              <Link to={`/product/${item.id}`} className="flex-1">
                <Button className="w-full" variant="default">
                  <ShoppingCart className="h-4 w-4 mr-2" /> View Product
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
