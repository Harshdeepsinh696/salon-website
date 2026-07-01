import ServiceCard from "./ServiceCard";

/** Groups services by category and renders a ServiceCard grid per group. */
export default function ServiceList({ services }) {
  const categories = [...new Set(services.map((s) => s.category))];

  return (
    <>
      {categories.map((cat) => (
        <div key={cat} className="mb-12">
          <h3 className="text-xl text-wine-700 mb-5 border-b border-gold-100 pb-2">{cat}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.filter((s) => s.category === cat).map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
