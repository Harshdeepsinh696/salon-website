export default function TimeSlotPicker({ slots, selectedTime, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {slots.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className={`px-4 py-2 rounded-full border text-sm ${
            selectedTime === s ? "border-wine-600 bg-wine-600 text-cream" : "border-gold-100 hover:border-gold-300"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
