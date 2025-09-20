import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToastContainer, toast } from 'react-toastify';
import { MapPin, ShoppingCart, LogOut, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(u);
    if (u) {
      const userEmail = u.email;
      const saved = JSON.parse(localStorage.getItem('addresses_' + u.email) || '[]');
      setAddresses(saved);
      const storedCart = JSON.parse(localStorage.getItem(`cartItems_${userEmail}`) || '[]');
      setCartItems(storedCart);
      const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userEmail}`) || '[]');
      setWishlistItems(storedWishlist);
    }
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const handleAddAddress = () => {
    if (!newAddress || !user) return;
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    localStorage.setItem('addresses_' + user.email, JSON.stringify(updated));
    setNewAddress('');
    toast.success('Address added');
  };

  const handleRemoveAddress = (index: number) => {
    if (!user) return;
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem('addresses_' + user.email, JSON.stringify(updated));
    toast.info('Address removed');
  };

  const handleRemoveCartItem = (id: number) => {
    const key = `cartItems_${user.email}`;
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    toast.info('Item removed from cart');
  };

  const handleRemoveWishlistItem = (id: number) => {
    const key = `wishlist_${user.email}`;
    const updated = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    toast.info('Removed from wishlist');
  };

  const handleMoveToCart = (item: any) => {
    const key = `cartItems_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    if (!stored.some((i: any) => i.id === item.id)) {
      stored.push({ ...item, quantity: 1 });
      localStorage.setItem(key, JSON.stringify(stored));
      toast.success('Moved to cart');
    }
    handleRemoveWishlistItem(item.id);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-6 bg-background/50 backdrop-blur-md rounded-2xl shadow-2xl ring-1 ring-primary/30 font-sans">
      {/* Profile overview metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 font-sans">
        <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl text-center">
          <h4 className="text-sm text-secondary-foreground uppercase">Membership</h4>
          <p className="text-lg font-semibold">Gold</p>
        </div>
        <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl text-center">
          <h4 className="text-sm text-secondary-foreground uppercase">Loyalty Points</h4>
          <p className="text-lg font-semibold">1200</p>
        </div>
        <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl text-center">
          <h4 className="text-sm text-secondary-foreground uppercase">Saved Addresses</h4>
          <p className="text-lg font-semibold">{addresses.length}</p>
        </div>
        <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl text-center">
          <h4 className="text-sm text-secondary-foreground uppercase">Wishlist</h4>
          <p className="text-lg font-semibold">{wishlistItems.length}</p>
        </div>
      </div>

      {/* Profile header */}
      <div className="flex items-center space-x-6 mb-10">
        <Avatar className="h-24 w-24 ring-4 ring-primary">
          {user?.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} alt={user.name} />
          ) : (
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <h1 className="text-5xl font-serif font-bold text-primary">{user.name}</h1>
          <p className="text-base text-secondary-foreground">{user.email}</p>
        </div>
      </div>

      <div className="space-y-12">
        {/* Past Orders Carousel */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-primary uppercase mb-4">Your Orders</h2>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">You have no past orders.</p>
          ) : (
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {orders.map(order => (
                <Card key={order.id} className="min-w-[200px] bg-background/80 backdrop-blur-sm border border-primary/20 rounded-xl shadow-lg p-4">
                  <img src={order.image} alt={order.name} className="w-full h-32 object-cover rounded-md mb-2" />
                  <h3 className="text-lg font-medium">{order.name}</h3>
                  <p className="text-sm text-secondary-foreground">{order.date}</p>
                  <p className="text-sm text-muted-foreground">₹{order.price}</p>
                </Card>
              ))}
            </div>
          )}
        </section>
        {/* Wishlist Carousel */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-primary uppercase mb-4">Wishlist</h2>
          {wishlistItems.length === 0 ? (
            <p className="text-muted-foreground">Your wishlist is empty.</p>
          ) : (
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {wishlistItems.map(item => (
                <Card key={item.id} className="min-w-[200px] bg-background/80 backdrop-blur-sm border border-primary/20 rounded-xl shadow-lg p-4">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md mb-2" />
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">₹{item.price}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <Button size="sm" className="btn-secondary uppercase" onClick={() => handleMoveToCart(item)}>Add to Cart</Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveWishlistItem(item.id)}><X className="h-4 w-4" /></Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
        {/* Addresses Carousel */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-primary uppercase mb-4">Saved Addresses</h2>
          {addresses.length === 0 ? (
            <p className="text-muted-foreground">No saved addresses.</p>
          ) : (
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {addresses.map((addr, idx) => (
                <Card key={idx} className="min-w-[200px] bg-background/80 backdrop-blur-sm border border-primary/20 rounded-xl shadow-lg p-4">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <p className="text-sm">{addr}</p>
                  </div>
                  <div className="mt-2 text-right">
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveAddress(idx)}><X className="h-4 w-4"/></Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <Input
              className="focus:border-primary"
              placeholder="Add new address"
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
            />
            <Button className="btn-primary" onClick={handleAddAddress}>Add Address</Button>
          </div>
        </section>
      </div>

      <div className="mt-10 flex justify-end">
        <Button size="lg" className="btn-outline flex items-center gap-2" onClick={handleLogout}>
          <LogOut className="h-5 w-5" /> Logout
        </Button>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}