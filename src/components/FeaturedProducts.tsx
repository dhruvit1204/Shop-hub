
import { ProductCard, Product } from "./ProductCard";

interface FeaturedProductsProps {
  title: string;
  products: Product[];
}

export function FeaturedProducts({ title, products }: FeaturedProductsProps) {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
