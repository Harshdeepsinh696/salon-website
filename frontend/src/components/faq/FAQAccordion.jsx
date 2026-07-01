import { useState } from "react";
import SectionHeading from "../common/SectionHeading";

const fallbackFaqs = [
  { id: 1, q: "Do I need to book in advance?", a: "Walk-ins are welcome, but booking guarantees your slot at the time you want." },
  { id: 2, q: "Do you serve kids?", a: "Yes — we have stylists experienced with children of all ages, with a patient, playful approach." },
  { id: 3, q: "What's your cancellation policy?", a: "You can cancel or reschedule from your dashboard up to a few hours before your slot, no questions asked." },
  { id: 4, q: "Do you take walk-ins for beard trims?", a: "Usually yes, though booking ahead avoids any wait during peak hours." },
];

export default function FAQAccordion({ faqs = fallbackFaqs }) {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="max-w-3xl mx-auto px-5 py-20">
      <SectionHeading eyebrow="Questions" title="Frequently Asked" />
      <div className="space-y-3">
        {faqs.map((f) => {
          const isOpen = openId === f.id;
          return (
            <div key={f.id} className="card cursor-pointer" onClick={() => setOpenId(isOpen ? null : f.id)}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-ink">{f.q}</p>
                <span className={`text-gold-600 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
              </div>
              {isOpen && <p className="text-sm text-ink/60 mt-3 leading-relaxed">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
