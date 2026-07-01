import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="max-w-3xl mx-auto text-center px-5 py-24">
      <h2 className="text-3xl text-wine-700 mb-4">Ready for your next appointment?</h2>
      <p className="text-ink/60 mb-8">Pick a service, choose a slot that suits you, and we'll take care of the rest.</p>
      <Link to="/book" className="btn-primary">Book Appointment</Link>
    </section>
  );
}
