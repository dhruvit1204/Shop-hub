import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  rating: number;
  ratingCount: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;
    
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    const key = user ? `cartItems_${user.email}` : 'cartItems';
    const stored = localStorage.getItem(key);
    const cart = stored ? JSON.parse(stored) : [];
    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      window.auth_modal.showModal();
      return;
    }
    if (cart.some((item: any) => item.id === product.id)) {
      toast({ title: "Already in Cart", description: `${product.name} is already in your cart.` });
      return;
    }
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem(key, JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));  
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Wishlist logic
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Allow wishlist without login
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    const key = user ? `wishlist_${user.email}` : 'wishlist';
    const stored = localStorage.getItem(key);
    let wishlist = stored ? JSON.parse(stored) : [];
    if (wishlist.some((item: any) => item.id === product.id)) {
      toast({ title: "Already in Wishlist", description: `${product.name} is already in your wishlist.` });
      return;
    }
    wishlist.push(product);
    localStorage.setItem(key, JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));  
    toast({ title: "Added to Wishlist", description: `${product.name} has been added to your wishlist.` });
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="product-card flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
            {discount}% OFF
          </span>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className={cn(
            "w-full aspect-square object-cover transition-transform duration-300",
            isHovered ? "scale-105" : ""
          )}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-muted-foreground mb-1">{product.category}</span>
        <h3 className="font-medium text-foreground line-clamp-2 mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-500">
            {Array(5).fill(null).map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-2">({product.ratingCount})</span>
        </div>
        <div className="mt-auto">
          <div className="flex items-center">
            {product.discountPrice ? (
              <>
                <span className="font-bold">₹{product.discountPrice}</span>
                <span className="text-muted-foreground text-sm ml-2 line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="font-bold">₹{product.price}</span>
            )}
          </div>
          <Button 
            className="w-full mt-2"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
          </Button>
          <Button 
            className="w-full mt-2" 
            size="sm" 
            variant="outline" 
            onClick={handleAddToWishlist}
          >
            <Heart className="h-4 w-4 mr-2 text-pink-500" /> Add to Wishlist
          </Button>
        </div>
      </div>
    </Link>
  );
}

// Helper function to handle className conditionals
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
