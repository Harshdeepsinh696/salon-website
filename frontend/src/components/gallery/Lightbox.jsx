export default function Lightbox({ image, onClose }) {
  if (!image) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-ink/80 flex items-center justify-center px-4" onClick={onClose}>
      <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        {image.url ? (
          <img src={image.url} alt={image.caption} className="w-full rounded-xl" />
        ) : (
          <div className="aspect-video bg-gold-100 rounded-xl flex items-center justify-center text-gold-600">
            {image.caption}
          </div>
        )}
        <button onClick={onClose} className="mt-4 text-cream text-sm underline">Close</button>
      </div>
    </div>
  );
}
