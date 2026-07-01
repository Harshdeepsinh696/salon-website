export default function Footer() {
  return (
    <footer className="bg-wine-900 text-cream/90 mt-24">
      <div className="max-w-6xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg text-gold-300 mb-2">Sanju&apos;s Family Salon</h3>
          <p className="text-sm text-cream/70 leading-relaxed">
            A chair for everyone in the family — thoughtful styling for men, women and kids, since day one.
          </p>
        </div>
        <div>
          <h4 className="font-body font-medium text-gold-300 mb-3 text-sm tracking-wide uppercase">Quick Links</h4>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><a href="/services" className="hover:text-gold-300">Services</a></li>
            <li><a href="/gallery" className="hover:text-gold-300">Gallery</a></li>
            <li><a href="/book" className="hover:text-gold-300">Book Appointment</a></li>
            <li><a href="/contact" className="hover:text-gold-300">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body font-medium text-gold-300 mb-3 text-sm tracking-wide uppercase">Visit Us</h4>
          <p className="text-sm text-cream/70 leading-relaxed">
            Mon – Sat, 9:00 AM – 8:00 PM<br />
            123 Ring Road, Rajkot, Gujarat
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 text-center text-xs text-cream/50 py-5">
        © {new Date().getFullYear()} Sanju's Family Salon. All rights reserved.
      </div>
    </footer>
  );
}
