import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Product } from "@/components/ProductCard";

// Sample product data (would come from API in real app)
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 3999,
    discountPrice: 2499,
    image: "https://images.unsplash.com/photo-1648447265709-67a4e785d7e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Electronics",
    rating: 4.5,
    ratingCount: 128,
  },
  {
    id: 2,
    name: "Men's Casual Shirt",
    price: 1299,
    discountPrice: 899,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80",
    category: "Fashion",
    rating: 4.2,
    ratingCount: 95,
  },
  {
    id: 3,
    name: "Smart Watch Series 7",
    price: 5999,
    discountPrice: 4999,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    category: "Electronics",
    rating: 4.8,
    ratingCount: 234,
  },
  {
    id: 4,
    name: "Women's Running Shoes",
    price: 2499,
    discountPrice: 1999,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    category: "Fashion",
    rating: 4.4,
    ratingCount: 156,
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 799,
    discountPrice: 599,
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    category: "Home",
    rating: 4.3,
    ratingCount: 78,
  },
  {
    id: 6,
    name: "Organic Face Wash",
    price: 599,
    discountPrice: 499,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    category: "Beauty",
    rating: 4.6,
    ratingCount: 42,
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 1999,
    discountPrice: 1499,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Electronics",
    rating: 4.4,
    ratingCount: 67,
  },
  {
    id: 8,
    name: "Kids Building Blocks",
    price: 899,
    discountPrice: 699,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Toys",
    rating: 4.7,
    ratingCount: 53,
  },
  {
    id: 9,
    name: "Women's Handbag",
    price: 1699,
    discountPrice: 1299,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
    category: "Fashion",
    rating: 4.3,
    ratingCount: 89,
  },
  {
    id: 10,
    name: "Stainless Steel Cookware Set",
    price: 4999,
    discountPrice: 3999,
    image: "https://images.unsplash.com/photo-1584936684506-c3a7980c8ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    category: "Home",
    rating: 4.8,
    ratingCount: 112,
  },
  {
    id: 11,
    name: "Noise Cancelling Headphones",
    price: 4999,
    discountPrice: 3999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Electronics",
    rating: 4.6,
    ratingCount: 203,
  },
  {
    id: 12,
    name: "Wireless Charging Pad",
    price: 1299,
    discountPrice: 999,
    image: "https://images.unsplash.com/photo-1622661437668-3f92a1eb685d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    category: "Electronics",
    rating: 4.3,
    ratingCount: 114,
  },
];

// Sample related products
const relatedProducts: Product[] = [
  {
    id: 3,
    name: "Smart Watch Series 7",
    price: 5999,
    discountPrice: 4999,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    category: "Electronics",
    rating: 4.8,
    ratingCount: 234,
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 1999,
    discountPrice: 1499,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Electronics",
    rating: 4.4,
    ratingCount: 67,
  },
  {
    id: 11,
    name: "Noise Cancelling Headphones",
    price: 4999,
    discountPrice: 3999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Electronics",
    rating: 4.6,
    ratingCount: 203,
  },
  {
    id: 12,
    name: "Wireless Charging Pad",
    price: 1299,
    discountPrice: 999,
    image: "https://images.unsplash.com/photo-1622661437668-3f92a1eb685d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    category: "Electronics",
    rating: 4.3,
    ratingCount: 114,
  },
];

export default function ProductDetail() {
  const { productId } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product from our sample data
  // In real app, fetch product details from API based on the ID
  const product = sampleProducts.find((p) => p.id === Number(productId)) || sampleProducts[0];
  
  const handleAddToCart = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      window.auth_modal.showModal();
      return;
    }
    const stored = localStorage.getItem('cartItems');
    const cart = stored ? JSON.parse(stored) : [];
    if (cart.some((item: any) => item.id === product.id)) {
      toast({ title: "Already in Cart", description: `${product.name} is already in your cart.` });
      return;
    }
    cart.push({ ...product, quantity });
    localStorage.setItem('cartItems', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast({
      title: "Added to Cart",
      description: `${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} added to cart.`,
    });
  };
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };
  
  return (
    <div className="container py-8">
      <Link to="/" className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shopping
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="bg-card rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.category}</p>
          </div>
          
          <div className="flex items-center">
            <div className="flex text-yellow-500">
              {Array(5).fill(null).map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-muted-foreground ml-2">({product.ratingCount} reviews)</span>
          </div>
          
          <div className="flex items-center">
            {product.discountPrice ? (
              <>
                <span className="text-2xl font-bold">₹{product.discountPrice}</span>
                <span className="text-muted-foreground text-lg ml-2 line-through">₹{product.price}</span>
                <span className="ml-2 bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium dark:bg-red-900 dark:text-red-200">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">₹{product.price}</span>
            )}
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">
              Experience premium quality with the {product.name}. Designed for comfort, style, and durability, this product is perfect for everyday use. Features include high-quality materials and modern design elements that make it stand out from the competition.
            </p>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button variant="outline" className="flex-1">
              <Heart className="mr-2 h-4 w-4" /> Wishlist
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <FeaturedProducts title="You may also like" products={relatedProducts} />
    </div>
  );
}
