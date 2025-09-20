import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24 font-sans">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-primary uppercase">
              Discover Your Style with ShopHub
            </h1>
            <p className="text-lg text-secondary-foreground">
              Shop the latest trends in fashion, electronics, home decor and more. All at unbeatable prices with fast delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="btn-primary">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Link to="/about">
                <Button variant="outline" size="lg" className="btn-outline">
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Shopping Banner" 
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
