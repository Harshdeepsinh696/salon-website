import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gold-100/60 to-cream px-5 pt-20 pb-24 text-center">
      <p className="hairline text-xs tracking-[0.25em] uppercase mb-5">A chair for every member of the family</p>
      <h1 className="text-4xl md:text-6xl text-wine-700 max-w-3xl mx-auto leading-tight fade-in">
        Sanju&apos;s Family Salon
      </h1>
      <p className="mt-5 text-ink/70 max-w-xl mx-auto leading-relaxed">
        One warm, welcoming space where men, women and kids all find a stylist who gets them right —
        book your seat in under a minute.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link to="/book" className="btn-primary">Book Appointment</Link>
        <Link to="/services" className="btn-outline">View Services</Link>
      </div>
    </section>
  );
}
