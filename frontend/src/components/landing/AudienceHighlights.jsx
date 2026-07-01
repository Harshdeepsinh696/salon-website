import SectionHeading from "../common/SectionHeading";

const highlights = [
  { title: "For Men", desc: "Sharp cuts, beard sculpting and grooming rituals.", icon: "✂️" },
  { title: "For Women", desc: "Styling, coloring, facials and bridal-ready looks.", icon: "💇‍♀️" },
  { title: "For Kids", desc: "Patient, playful cuts that keep little ones smiling.", icon: "🧒" },
];

export default function AudienceHighlights() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <SectionHeading eyebrow="Who we welcome" title="One salon, three kinds of care" />
      <div className="grid md:grid-cols-3 gap-6">
        {highlights.map((h) => (
          <div key={h.title} className="card text-center">
            <div className="text-3xl mb-3">{h.icon}</div>
            <h3 className="text-xl text-wine-700 mb-2">{h.title}</h3>
            <p className="text-sm text-ink/60">{h.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
