export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-gold-300 border-t-wine-600 animate-spin" />
      <p className="text-sm text-ink/60">{label}</p>
    </div>
  );
}
