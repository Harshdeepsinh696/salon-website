export default function TestimonialCard({ customer, text, rating }) {
  return (
    <div className="card h-full flex flex-col justify-between">
      <p className="text-ink/70 italic leading-relaxed">"{text}"</p>
      <div className="mt-4">
        <p className="text-wine-700 font-medium text-sm">{customer}</p>
        <p className="text-gold-500 text-sm">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</p>
      </div>
    </div>
  );
}
