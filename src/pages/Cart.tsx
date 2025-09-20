import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { API_BASE_URL, getAuthHeaders } from "@/config/api";

export default function Cart() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) return;
    const user = JSON.parse(userData);
    const key = `cartItems_${user.email}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) return;
    const user = JSON.parse(userData);
    const key = `cartItems_${user.email}`;
    localStorage.setItem(key, JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      toast({
        title: "Not Logged In",
        description: "You have to log in first.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Recompute totals for billing
    const subtotal = cartItems.reduce(
      (total, item) => total + (item.discountPrice || item.price) * item.quantity,
      0
    );
    const deliveryFee = 99;
    const totalAmount = subtotal + deliveryFee;

    // Prepare order summary string
    const itemsList = cartItems
      .map(item => `${item.name} x${item.quantity} - ₹${(item.discountPrice || item.price) * item.quantity}`)
      .join("\n");

    // Store orders locally
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrders = [
      ...storedOrders,
      ...cartItems.map(item => ({
        id: Date.now() + item.id,
        name: item.name,
        image: item.image,
        price: item.discountPrice || item.price,
        date: new Date().toLocaleDateString(),
      })),
    ];
    localStorage.setItem('orders', JSON.stringify(newOrders));

    try {
      await axios.post(
        `${API_BASE_URL}/email/send-order`,
        {
          to: user.email,
          subject: "Order Confirmation - ShopHub",
          body: `Hello ${user.name},\n\nThank you for your order!\n\n${itemsList}\n\nSubtotal: ₹${subtotal}\nDelivery: ₹${deliveryFee}\nTotal: ₹${totalAmount}\n\nHappy Shopping!\nShopHub Team`,
        },
        { headers: getAuthHeaders() }
      );
      toast({ title: "Email Sent", description: "Confirmation email sent successfully." });
    } catch (error) {
      toast({ title: "Email Failed", description: "Unable to send confirmation email.", variant: "destructive" });
    }

    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully!",
    });
    navigate("/profile");
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  const deliveryFee = 99;
  const total = subtotal + deliveryFee;

  return (
    <div className="container py-8 font-sans bg-background/50 backdrop-blur-sm rounded-xl shadow-lg border border-primary/20">
      <h1 className="text-3xl font-serif font-bold text-primary uppercase mb-8">Your Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="border-2 border-primary bg-background/80 rounded-xl hover:shadow-2xl transition-shadow p-6 flex items-start">
                  <Link to={`/product/${item.id}`} className="w-24 h-24 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="ml-4 flex-grow">
                    <Link to={`/product/${item.id}`} className="font-medium hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                    <p className="font-bold mt-1">₹{item.price.toLocaleString()}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="mx-3">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/" className="flex items-center text-foreground/70 hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
              </Link>
            </div>
          </div>
          {/* Order Summary */}
          <div>
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-primary/20 shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-primary uppercase mb-4">Order Summary</h2>
              <div className="space-y-3 border-b pb-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold py-3">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <Button className="w-full mt-4 btn-primary uppercase py-3" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 font-sans">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-secondary-foreground" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-primary uppercase mb-2">Your Cart is Empty</h2>
          <p className="text-secondary-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild className="btn-primary uppercase py-3 px-6">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
