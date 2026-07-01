import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { serviceService } from "../../services/serviceService";

const fallback = [
  { id: 1, name: "Hair Cut", category: "Hair", price: 150, duration: 30 },
  { id: 2, name: "Beard Trim", category: "Men", price: 100, duration: 20 },
];

export default function ManageServices() {
  const [services, setServices] = useState(fallback);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", duration: "" });

  useEffect(() => {
    serviceService.getAll().then((res) => setServices(res.data?.length ? res.data : fallback)).catch(() => {});
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", category: "", price: "", duration: "" });
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditing(s);
    setForm(s);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (editing) {
      setServices((prev) => prev.map((s) => (s.id === editing.id ? { ...editing, ...form } : s)));
      serviceService.update(editing.id, form).catch(() => {});
    } else {
      const tempId = Date.now();
      setServices((prev) => [...prev, { id: tempId, ...form }]);
      serviceService.create(form).catch(() => {});
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    serviceService.remove(id).catch(() => {});
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-wine-700">Manage Services</h1>
        <Button onClick={openNew}>+ Add Service</Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((s) => (
          <div key={s.id} className="card">
            <div className="flex justify-between">
              <div>
                <p className="font-medium text-ink">{s.name}</p>
                <p className="text-xs text-ink/50">{s.category} · {s.duration} mins</p>
              </div>
              <p className="text-wine-600 font-medium">₹{s.price}</p>
            </div>
            <div className="flex gap-3 mt-4 text-sm">
              <button onClick={() => openEdit(s)} className="text-wine-700 hover:underline">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Service" : "Add Service"}>
        <div className="space-y-3">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-gold-100 px-4 py-2 bg-cream" />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-lg border border-gold-100 px-4 py-2 bg-cream" />
          <input placeholder="Price (₹)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full rounded-lg border border-gold-100 px-4 py-2 bg-cream" />
          <input placeholder="Duration (mins)" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="w-full rounded-lg border border-gold-100 px-4 py-2 bg-cream" />
          <Button onClick={handleSave} className="w-full">Save</Button>
        </div>
      </Modal>
    </div>
  );
}
