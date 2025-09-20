import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const teamMembers = [
  {
    name: "Dhruvit Gadara",
    role: "Founder & CEO",
  },
  {
    name: "Jay",
    role: "Team Member",
  },
];

const testimonials = [
  {
    name: "Amit S.",
    quote: "ShopHub makes shopping so easy and reliable! Fast delivery and great prices.",
  },
  {
    name: "Sneha R.",
    quote: "I love the variety and the customer support is top-notch!",
  },
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 font-sans bg-background/50 backdrop-blur-sm rounded-xl shadow-lg border border-primary/20">
      <h1 className="text-3xl font-serif font-bold text-primary text-center uppercase mb-8">About Us</h1>

      {/* 1. Who We Are */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-primary uppercase mb-2">Who We Are</h2>
        <p className="text-muted-foreground mb-2">
          At <span className="font-bold">ShopHub</span>, we're passionate about connecting people with quality products at affordable prices. Our mission is to bring the marketplace to your fingertips with ease, trust, and variety.
        </p>
        <p className="text-muted-foreground">Our vision is to become India's most beloved one-stop shop for everything you need, delivered with care and innovation.</p>
      </section>

      {/* 2. Our Story */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-primary uppercase mb-2">Our Story</h2>
        <p className="text-muted-foreground mb-2">
          Founded in 2024 by a team of tech and retail enthusiasts, ShopHub started as a small online store. Today, we've grown into a diverse marketplace serving customers across India.
        </p>
        <p className="text-muted-foreground">Our founder's vision was to create a seamless shopping experience for everyone, everywhere.</p>
      </section>

      {/* 3. What We Offer */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-primary uppercase mb-2">What We Offer</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-2">
          <li>Fashion</li>
          <li>Electronics</li>
          <li>Home & Kitchen</li>
          <li>Beauty & Personal Care</li>
          <li>Toys</li>
        </ul>
        <p className="text-muted-foreground">We offer a wide range of products, curated with care. Our platform ensures easy navigation, secure payments, and timely delivery across the country.</p>
      </section>

      {/* 4. Why Choose Us */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-primary uppercase mb-2">Why Choose Us</h2>
        <ul className="list-disc list-inside text-muted-foreground mb-2">
          <li>Trusted by 5000+ happy customers</li>
          <li>4.8-star average rating</li>
          <li>Responsive customer service</li>
          <li>Quality guarantee and fast delivery</li>
        </ul>
      </section>

      {/* 5. Our Values */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-primary uppercase mb-2">Our Values</h2>
        <ul className="list-disc list-inside text-muted-foreground">
          <li>Transparency</li>
          <li>Sustainability</li>
          <li>Customer Focus</li>
          <li>Innovation</li>
        </ul>
      </section>

      {/* 6. Meet the Team */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-primary uppercase mb-2">Meet the Team</h2>
        <div className="flex gap-6 flex-wrap">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-primary/20 w-40">
              <User className="w-20 h-20 mb-2 text-muted-foreground bg-gray-100 rounded-full p-4" />
              <div className="font-bold text-gray-900 dark:text-black">{member.name}</div>
              <div className="text-sm text-muted-foreground">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Location & Operations */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-primary uppercase mb-2">Location & Operations</h2>
        <p className="text-muted-foreground">We are based in Ahmedabad, Gujarat, and deliver to customers all across India.</p>
      </section>

      {/* 8. Contact or CTA Section */}
      <section className="mb-8 text-center">
        <h2 className="text-xl font-serif font-semibold text-primary uppercase mb-2">Get in Touch</h2>
        <p className="text-muted-foreground mb-4">Have questions or feedback? We'd love to hear from you!</p>
        <Link to="/contact">
          <button className="btn-primary uppercase px-6 py-2">Contact Us</button>
        </Link>
      </section>

      {/* 9. Customer Testimonials */}
      <section className="mb-8">
        <h2 className="text-xl font-serif font-semibold text-primary uppercase mb-2">Customer Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-primary/20">
              <div className="italic mb-2">"{t.quote}"</div>
              <div className="font-semibold text-muted-foreground">- {t.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
