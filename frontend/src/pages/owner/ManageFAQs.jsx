import { useState } from "react";
import Button from "../../components/common/Button";

const initialFaqs = [
  { id: 1, q: "Do I need to book in advance?", a: "Walk-ins are welcome, but booking guarantees your slot." },
  { id: 2, q: "Do you serve kids?", a: "Yes — we have stylists experienced with children of all ages." },
];

export default function ManageFAQs() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [form, setForm] = useState({ q: "", a: "" });

  const handleAdd = () => {
    if (!form.q || !form.a) return;
    setFaqs((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ q: "", a: "" });
    // TODO: POST to /faqs once the backend endpoint exists
  };

  const handleDelete = (id) => setFaqs((prev) => prev.filter((f) => f.id !== id));

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-6">FAQs</h1>

      <div className="card mb-6 space-y-3">
        <input placeholder="Question" value={form.q} onChange={(e) => setForm({ ...form, q: e.target.value })}
          className="w-full rounded-lg border border-gold-100 px-4 py-2 bg-cream" />
        <textarea placeholder="Answer" rows={2} value={form.a} onChange={(e) => setForm({ ...form, a: e.target.value })}
          className="w-full rounded-lg border border-gold-100 px-4 py-2 bg-cream" />
        <Button onClick={handleAdd}>Add FAQ</Button>
      </div>

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="card">
            <div className="flex justify-between">
              <p className="font-medium text-ink">{f.q}</p>
              <button onClick={() => handleDelete(f.id)} className="text-red-600 text-sm hover:underline">Remove</button>
            </div>
            <p className="text-sm text-ink/60 mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
