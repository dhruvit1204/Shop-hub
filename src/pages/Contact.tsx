import React from "react";

export default function Contact() {
  return (
    <div className="container mx-auto py-12 font-sans bg-background/50 backdrop-blur-sm rounded-xl shadow-lg border border-primary/20">
      <h1 className="text-4xl font-serif font-bold text-primary uppercase text-center mb-6">Get in Touch</h1>
      <p className="text-lg text-secondary-foreground mb-8 text-center">We're here to help. Reach out to us with any questions or feedback.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-4">Customer Support</h2>
          <p>Email: <a href="mailto:support@shophub.com" className="text-primary hover:underline">support@shophub.com</a></p>
          <p>Phone: <a href="tel:+15551234567" className="text-primary hover:underline">+91 7202080820</a></p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-4">Head Office</h2>
          <address className="not-italic text-secondary-foreground">
            503 Navkar Palace<br />
            Surat, In 394326<br />
            India
          </address>
        </div>
      </div>
      <div className="mt-8 text-center text-base text-muted-foreground">
        Business Hours: Mon-Fri 9:00 AM - 6:00 PM
      </div>
    </div>
  );
}
