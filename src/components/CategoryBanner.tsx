import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  image: string;
  path: string;
}

interface CategoryBannerProps {
  categories: Category[];
}

export function CategoryBanner({ categories }: CategoryBannerProps) {
  return (
    <section className="py-12 font-sans" id="categories">
      <div className="container">
        <h2 className="text-3xl font-serif font-bold text-primary uppercase mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.path} 
              className="group relative overflow-hidden rounded-xl shadow-md ring ring-primary/20 transition-shadow hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <h3 className="text-xl font-serif text-white uppercase">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
