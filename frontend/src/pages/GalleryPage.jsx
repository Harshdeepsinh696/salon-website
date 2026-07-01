import { useEffect, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import GalleryGrid from "../components/gallery/GalleryGrid";
import Lightbox from "../components/gallery/Lightbox";
import { galleryService } from "../services/galleryService";

const fallbackImages = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  url: null,
  caption: `Work sample ${i + 1}`,
}));

export default function GalleryPage() {
  const [images, setImages] = useState(fallbackImages);
  const [active, setActive] = useState(null);

  useEffect(() => {
    galleryService
      .getAll()
      .then((res) => setImages(res.data?.length ? res.data : fallbackImages))
      .catch(() => setImages(fallbackImages));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <SectionHeading eyebrow="Our Work" title="Gallery" subtitle="A glimpse of recent cuts, colors and styling sessions." />
      <GalleryGrid images={images} onImageClick={setActive} />
      <Lightbox image={active} onClose={() => setActive(null)} />
    </div>
  );
}
