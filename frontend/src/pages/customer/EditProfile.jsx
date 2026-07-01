import { useState } from "react";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";

export default function EditProfile() {
  const { user, login, token } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await userService.updateProfile(form);
      login({ ...user, ...res.data }, token);
      setSaved(true);
    } catch {
      // TODO: surface error toast
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="card max-w-md space-y-4">
        {saved && <p className="text-sm text-green-700">Profile updated.</p>}
        <div>
          <label className="text-sm text-ink/60 block mb-1">Full Name</label>
          <input name="name" value={form.name} onChange={handleChange}
            className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300" />
        </div>
        <div>
          <label className="text-sm text-ink/60 block mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300" />
        </div>
        <div>
          <label className="text-sm text-ink/60 block mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange}
            className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300" />
        </div>
        <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
      </form>
    </div>
  );
}
