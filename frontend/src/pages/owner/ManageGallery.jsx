import { useEffect, useRef, useState } from "react";
import Button from "../../components/common/Button";
import { galleryService } from "../../services/galleryService";

const fallback = Array.from({ length: 4 }).map((_, i) => ({ id: i + 1, url: null, caption: `Image ${i + 1}` }));

export default function ManageGallery() {
  const [images, setImages] = useState(fallback);
  const fileRef = useRef(null);

  useEffect(() => {
    galleryService.getAll().then((res) => setImages(res.data?.length ? res.data : fallback)).catch(() => {});
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await galleryService.upload(formData);
      setImages((prev) => [...prev, res.data]);
    } catch {
      // Fallback: show a local preview even if the API isn't wired yet.
      setImages((prev) => [...prev, { id: Date.now(), url: URL.createObjectURL(file), caption: file.name }]);
    }
  };

  const handleDelete = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    galleryService.remove(id).catch(() => {});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-wine-700">Manage Gallery</h1>
        <Button onClick={() => fileRef.current.click()}>+ Upload Image</Button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleUpload} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative aspect-square rounded-xl bg-gold-100 overflow-hidden group">
            {img.url ? (
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gold-600 text-xs text-center px-2">{img.caption}</div>
            )}
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-2 right-2 bg-ink/60 text-cream text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
