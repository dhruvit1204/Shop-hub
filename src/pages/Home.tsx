
import { HeroBanner } from "@/components/HeroBanner";
import { CategoryBanner } from "@/components/CategoryBanner";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Product } from "@/components/ProductCard";

// Sample data - in a real app this would come from an API
const categories = [
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    path: "/category/fashion",
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    path: "/category/electronics",
  },
  {
    id: "home",
    name: "Home",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
    path: "/category/home",
  },
  {
    id: "beauty",
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    path: "/category/beauty",
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    path: "/category/toys",
  },
];

const featuredProducts: Product[] = [
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
];

const newArrivals: Product[] = [
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
    image: "https://plus.unsplash.com/premium_photo-1664391825760-17aacf4cb3b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3RhaW5sZXNzJTIwU3RlZWwlMjBDb29rd2FyZSUyMFNldHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Home",
    rating: 4.8,
    ratingCount: 112,
  },
];

export default function Home() {
  return (
    <>
      <HeroBanner />
      <CategoryBanner categories={categories} />
      <FeaturedProducts title="Featured Products" products={featuredProducts} />
      <FeaturedProducts title="New Arrivals" products={newArrivals} />
    </>
  );
}
