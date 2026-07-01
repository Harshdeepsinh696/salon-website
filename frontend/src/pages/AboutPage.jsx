import SectionHeading from "../components/common/SectionHeading";

const values = [
  { title: "Family First", desc: "Every chair is set up for a different age and need — we never make one style fit all." },
  { title: "Skilled Hands", desc: "Our stylists train continuously on the latest cuts, colors and treatments." },
  { title: "Honest Pricing", desc: "What you see on the menu is what you pay — no hidden add-ons." },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-20">
      <SectionHeading eyebrow="Our Story" title="About Sanju's Family Salon" align="left" />
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div className="space-y-4 text-ink/70 leading-relaxed">
          <p>
            Sanju's Family Salon started with a simple idea: a salon shouldn't make anyone in the family
            feel like an afterthought. Dads waiting on hard benches while the kids get restless, or
            a rushed cut squeezed between other bookings — we built something different.
          </p>
          <p>
            Today we serve men, women and kids under one roof, with stylists who specialize in each,
            so the care never feels generic.
          </p>
        </div>
        <div className="aspect-[4/3] rounded-2xl bg-gold-100 flex items-center justify-center text-gold-600 font-display text-lg">
          Salon interior photo
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {values.map((v) => (
          <div key={v.title} className="card">
            <h3 className="text-lg text-wine-700 mb-2">{v.title}</h3>
            <p className="text-sm text-ink/60 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
