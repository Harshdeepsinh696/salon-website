import Button from "../common/Button";

/** Optional notes step + submit button shown once a slot is chosen. */
export default function BookingForm({ notes, onNotesChange, onSubmit, disabled, submitting }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-wine-700 mb-3">Anything We Should Know? (optional)</h3>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="e.g. allergies, preferred stylist"
          className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300"
        />
      </div>
      <Button onClick={onSubmit} disabled={disabled} className="w-full">
        {submitting ? "Booking..." : "Confirm Booking"}
      </Button>
    </div>
  );
}
