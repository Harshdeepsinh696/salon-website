export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 px-4" onClick={onClose}>
      <div
        className="bg-cream rounded-2xl max-w-md w-full p-6 shadow-xl fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-wine-700">{title}</h3>
          <button onClick={onClose} className="text-ink/50 hover:text-ink" aria-label="Close">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
