import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background/60 backdrop-blur-sm shadow-inner border-t border-primary/20 mt-16">
      <div className="container py-12 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl text-primary uppercase mb-4">ShopHub</h3>
            <p className="text-secondary-foreground">
              Your one-stop destination for all your shopping needs. Quality products, great prices, and fast delivery.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-lg text-primary uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-foreground/70 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg text-primary uppercase mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/fashion" className="text-foreground/70 hover:text-primary transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/category/electronics" className="text-foreground/70 hover:text-primary transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/home" className="text-foreground/70 hover:text-primary transition-colors">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link to="/category/beauty" className="text-foreground/70 hover:text-primary transition-colors">
                  Beauty & Personal Care
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg text-primary uppercase mb-4">Contact Us</h3>
            <address className="not-italic text-secondary-foreground">
              <p>503 Navkar Palace</p>  
              <p>Retail District, RS 12345</p>
              <p className="mt-2">Email: support@shophub.com</p>
              <p>Phone: +91 7202080820</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-secondary-foreground">
          <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
