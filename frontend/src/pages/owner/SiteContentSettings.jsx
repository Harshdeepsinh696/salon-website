import { useState } from "react";
import Button from "../../components/common/Button";

export default function SiteContentSettings() {
  const [content, setContent] = useState({
    heroTitle: "Sanju's Family Salon",
    heroSubtitle: "One warm, welcoming space where men, women and kids all find a stylist who gets them right.",
    address: "123 Ring Road, Rajkot, Gujarat",
    phone: "+91 98765 43210",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setContent({ ...content, [e.target.name]: e.target.value });

  const handleSave = () => {
    // TODO: PUT to a /site-content endpoint once available
    setSaved(true);
  };

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-6">Site Content</h1>
      <div className="card max-w-lg space-y-4">
        {saved && <p className="text-sm text-green-700">Content updated.</p>}
        <div>
          <label className="text-sm text-ink/60 block mb-1">Hero Title</label>
          <input name="heroTitle" value={content.heroTitle} onChange={handleChange}
            className="w-full rounded-lg border border-gold-100 px-4 py-2 bg-cream" />
        </div>
        <div>
          <label className="text-sm text-ink/60 block mb-1">Hero Subtitle</label>
          <textarea name="heroSubtitle" rows={2} value={content.heroSubtitle} onChange={handleChange}
            className="w-full rounded-lg border border-gold-100 px-4 py-2 bg-cream" />
        </div>
        <div>
          <label className="text-sm text-ink/60 block mb-1">Address</label>
          <input name="address" value={content.address} onChange={handleChange}
            className="w-full rounded-lg border border-gold-100 px-4 py-2 bg-cream" />
        </div>
        <div>
          <label className="text-sm text-ink/60 block mb-1">Phone</label>
          <input name="phone" value={content.phone} onChange={handleChange}
            className="w-full rounded-lg border border-gold-100 px-4 py-2 bg-cream" />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
