import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard, Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample product data across categories
const allProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 3999,
    discountPrice: 2499,
    image: "https://images.unsplash.com/photo-1648447265709-67a4e785d7e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "electronics",
    rating: 4.5,
    ratingCount: 128,
  },
  {
    id: 2,
    name: "Men's Casual Shirt",
    price: 1299,
    discountPrice: 899,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80",
    category: "fashion",
    rating: 4.2,
    ratingCount: 95,
  },
  {
    id: 3,
    name: "Smart Watch Series 7",
    price: 5999,
    discountPrice: 4999,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    category: "electronics",
    rating: 4.8,
    ratingCount: 234,
  },
  {
    id: 4,
    name: "Women's Running Shoes",
    price: 2499,
    discountPrice: 1999,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    category: "fashion",
    rating: 4.4,
    ratingCount: 156,
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 799,
    discountPrice: 599,
    image: "https://images.unsplash.com/photo-1610399809302-f1dd7ec33187?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "home",
    rating: 4.3,
    ratingCount: 78,
  },
  {
    id: 6,
    name: "Organic Face Wash",
    price: 599,
    discountPrice: 499,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    category: "beauty",
    rating: 4.6,
    ratingCount: 42,
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 1999,
    discountPrice: 1499,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "electronics",
    rating: 4.4,
    ratingCount: 67,
  },
  {
    id: 8,
    name: "Kids Building Blocks",
    price: 899,
    discountPrice: 699,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "toys",
    rating: 4.7,
    ratingCount: 53,
  },
  {
    id: 9,
    name: "Women's Handbag",
    price: 1699,
    discountPrice: 1299,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80",
    category: "fashion",
    rating: 4.3,
    ratingCount: 89,
  },
  {
    id: 10,
    name: "Stainless Steel Cookware Set",
    price: 4999,
    discountPrice: 3999,
    image: "https://images.unsplash.com/photo-1584990347165-6da57a4be47d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "home",
    rating: 4.8,
    ratingCount: 112,
  },
  {
    id: 11,
    name: "Noise Cancelling Headphones",
    price: 4999,
    discountPrice: 3999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "electronics",
    rating: 4.6,
    ratingCount: 203,
  },
  {
    id: 12,
    name: "Kids Toy Kitchen Set",
    price: 1599,
    discountPrice: 1299,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "toys",
    rating: 4.5,
    ratingCount: 78,
  },
  {
    id: 13,
    name: "Moisturizing Face Cream",
    price: 799,
    discountPrice: 649,
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "beauty",
    rating: 4.4,
    ratingCount: 112,
  },
  {
    id: 14,
    name: "Women's Summer Dress",
    price: 1899,
    discountPrice: 1499,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1434&q=80",
    category: "fashion",
    rating: 4.7,
    ratingCount: 143,
  },
  {
    id: 15,
    name: "Bedside Table Lamp",
    price: 1299,
    discountPrice: 999,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    category: "home",
    rating: 4.2,
    ratingCount: 67,
  },
];

// Category UI labels
const categoryLabels: Record<string, string> = {
  fashion: "Fashion",
  electronics: "Electronics",
  home: "Home & Kitchen",
  beauty: "Beauty & Personal Care",
  toys: "Toys & Games",
};

export default function CategoryProducts() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const isMobile = useIsMobile();
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [sortBy, setSortBy] = useState("recommended");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [ratings, setRatings] = useState<number[]>([]);
  
  // Filter products by category, price range, and ratings
  const filteredProducts = allProducts.filter((product) => {
    // Category filter
    if (categoryId && product.category.toLowerCase() !== categoryId.toLowerCase()) {
      return false;
    }
    // Price filter
    const price = product.discountPrice ?? product.price;
    if (price < priceRange[0] || price > priceRange[1]) {
      return false;
    }
    // Ratings filter
    if (ratings.length > 0 && !ratings.some((star) => product.rating >= star)) {
      return false;
    }
    return true;
  });
  
  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case "price-high":
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // recommended/default sorting
    }
  });
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="container py-8 font-sans">
      <h1 className="text-3xl font-serif font-bold text-primary uppercase mb-6">
        {categoryId ? categoryLabels[categoryId] || categoryId : "All Products"}
      </h1>
      
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          className="md:hidden flex items-center text-primary border-primary hover:bg-primary/10" 
          onClick={toggleFilters}
        >
          {showFilters ? (
            <>
              <X className="h-4 w-4 mr-2" /> Hide Filters
            </>
          ) : (
            <>
              <Filter className="h-4 w-4 mr-2" /> Show Filters
            </>
          )}
        </Button>
        
        <div className="flex items-center ml-auto">
          <span className="text-sm text-foreground/70 mr-2 hidden md:inline">Sort by:</span>
          <select 
            className="bg-background/50 backdrop-blur-sm border border-primary/20 rounded-md p-2 text-sm text-foreground"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar */}
        {showFilters && (
          <div className="w-full md:w-64 space-y-6 bg-background/70 backdrop-blur-sm shadow-lg border border-primary/20 p-6 rounded-xl">
            <div>
              <h3 className="font-serif uppercase text-sm text-primary mb-3 flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
              </h3>
              
              <div className="border-t pt-3">
                <h4 className="text-sm font-serif font-semibold text-primary mb-2">Price Range</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">₹{priceRange[0]}</span>
                    <span className="text-xs">₹{priceRange[1]}</span>
                  </div>
                  {/* This would be a proper range slider in a real app */}
                  <input 
                    type="range" 
                    min="0" 
                    max="10000" 
                    className="w-full"
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    value={priceRange[1]}
                  />
                </div>
              </div>
              
              <div className="border-t mt-4 pt-3">
                <h4 className="text-sm font-serif font-semibold text-primary mb-2">Customer Ratings</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((star) => (
                    <label key={star} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={ratings.includes(star)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRatings([...ratings, star]);
                          } else {
                            setRatings(ratings.filter(r => r !== star));
                          }
                        }}
                      />
                      <div className="flex text-yellow-500">
                        {Array(5).fill(null).map((_, i) => (
                          <span key={i}>{i < star ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <span className="ml-1 text-sm">& above</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {isMobile && (
                <Button className="w-full mt-4" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Product grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              <Button variant="link" onClick={() => {
                setPriceRange([0, 10000]);
                setRatings([]);
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
