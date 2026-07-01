export default function GalleryGrid({ images, onImageClick }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((img) => (
        <button
          key={img.id}
          onClick={() => onImageClick?.(img)}
          className="aspect-square rounded-xl bg-gold-100 flex items-center justify-center text-gold-600 text-xs text-center px-2 overflow-hidden hover:opacity-90 transition-opacity"
        >
          {img.url ? (
            <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
          ) : (
            img.caption
          )}
        </button>
      ))}
    </div>
  );
}
