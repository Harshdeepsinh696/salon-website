import { nextNDays } from "../../utils/dateUtils";

export default function DatePicker({ selectedDate, onSelect, days = 14 }) {
  const dates = nextNDays(days);

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {dates.map((d) => {
        const isSelected = selectedDate && d.toDateString() === selectedDate.toDateString();
        return (
          <button
            key={d.toISOString()}
            onClick={() => onSelect(d)}
            className={`shrink-0 w-16 py-2 rounded-lg border text-center text-sm ${
              isSelected ? "border-wine-600 bg-wine-600 text-cream" : "border-gold-100 hover:border-gold-300"
            }`}
          >
            <div className="text-xs">{d.toLocaleDateString("en-IN", { weekday: "short" })}</div>
            <div className="font-medium">{d.getDate()}</div>
          </button>
        );
      })}
    </div>
  );
}
