import { useEffect, useState } from "react";
import { testimonialService } from "../../services/testimonialService";

const fallback = [
  { id: 1, customer: "Priya M.", text: "Best haircut I've had in years, and the kids love it too!", rating: 5 },
  { id: 2, customer: "Rahul K.", text: "Quick, clean, and the beard trim was on point.", rating: 4 },
];

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState(fallback);

  useEffect(() => {
    testimonialService.getAll().then((res) => setTestimonials(res.data?.length ? res.data : fallback)).catch(() => {});
  }, []);

  const handleDelete = (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    testimonialService.remove(id).catch(() => {});
  };

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-6">Testimonials</h1>
      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="card flex justify-between items-start gap-4">
            <div>
              <p className="text-ink/80 italic">"{t.text}"</p>
              <p className="text-sm text-wine-700 mt-2">— {t.customer} · {"★".repeat(t.rating)}</p>
            </div>
            <button onClick={() => handleDelete(t.id)} className="text-red-600 text-sm hover:underline shrink-0">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
