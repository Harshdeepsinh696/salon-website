import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";

const featuredServices = [
  { name: "Hair Cut", price: "₹150+" },
  { name: "Hair Styling", price: "₹300+" },
  { name: "Facial", price: "₹500+" },
  { name: "Manicure", price: "₹400+" },
];

export default function ServicesPreview() {
  return (
    <section className="bg-wine-700 text-cream px-5 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Popular picks"
          title="Signature Services"
          subtitle="A quick look — see the full menu and book in one flow."
          theme="dark"
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {featuredServices.map((s) => (
            <div key={s.name} className="border border-cream/20 rounded-xl p-5 text-center hover:border-gold-300 transition-colors">
              <p className="font-display text-lg">{s.name}</p>
              <p className="text-gold-300 text-sm mt-1">{s.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="btn-outline-light">See Full Menu</Link>
        </div>
      </div>
    </section>
  );
}
