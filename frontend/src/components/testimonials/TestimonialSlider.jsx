import { useEffect, useState } from "react";
import SectionHeading from "../common/SectionHeading";
import TestimonialCard from "./TestimonialCard";
import { testimonialService } from "../../services/testimonialService";

const fallback = [
  { id: 1, customer: "Priya M.", text: "Best haircut I've had in years, and the kids love it too!", rating: 5 },
  { id: 2, customer: "Rahul K.", text: "Quick, clean, and the beard trim was on point.", rating: 4 },
  { id: 3, customer: "Sneha D.", text: "The facial left my skin glowing before my sister's wedding.", rating: 5 },
];

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState(fallback);

  useEffect(() => {
    testimonialService
      .getAll()
      .then((res) => setTestimonials(res.data?.length ? res.data : fallback))
      .catch(() => setTestimonials(fallback));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <SectionHeading eyebrow="Kind Words" title="What Families Say" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} customer={t.customer} text={t.text} rating={t.rating} />
        ))}
      </div>
    </section>
  );
}
