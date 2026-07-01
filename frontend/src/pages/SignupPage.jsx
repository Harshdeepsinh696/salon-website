import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authService.customerSignup(form);
      const { user, token } = res.data;
      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-24">
      <h1 className="text-3xl text-wine-700 text-center mb-2">Create Account</h1>
      <p className="text-center text-ink/60 mb-8">Join to book appointments and track your visits.</p>

      <form onSubmit={handleSubmit} className="card space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <label className="text-sm text-ink/60 block mb-1">Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} required
            className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300" />
        </div>
        <div>
          <label className="text-sm text-ink/60 block mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required
            className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300" />
        </div>
        <div>
          <label className="text-sm text-ink/60 block mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} required
            className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300" />
        </div>
        <div>
          <label className="text-sm text-ink/60 block mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required
            className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300" />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <p className="text-center text-sm text-ink/60 mt-5">
        Already have an account? <Link to="/login" className="text-wine-700 hover:underline">Log in</Link>
      </p>
    </div>
  );
}
