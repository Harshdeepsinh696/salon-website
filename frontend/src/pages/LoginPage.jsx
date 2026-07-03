import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

/**
 * A single login page with a Customer / Owner tab.
 * Owner credentials are seeded server-side by default (see backend/prisma/seed.js) —
 * the owner does not sign up through the UI.
 */
export default function LoginPage() {
  const [role, setRole] = useState("customer");
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res =
        role === "owner"
          ? await authService.ownerLogin(form.identifier, form.password)
          : await authService.customerLogin(form.identifier, form.password);

      const { user, token } = res.data;
      login(user, token);
      navigate(role === "owner" ? "/owner" : location.state?.from?.pathname || "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-24">
      <h1 className="text-3xl text-wine-700 text-center mb-2">Welcome Back</h1>
      <p className="text-center text-ink/60 mb-8">Log in to book, manage or track appointments.</p>

      <div className="flex bg-gold-100 rounded-full p-1 mb-8">
        {["customer", "owner"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`flex-1 py-2 rounded-full text-sm capitalize transition-colors ${role === r ? "bg-wine-600 text-cream" : "text-wine-700"
              }`}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="card space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <label className="text-sm text-ink/60 block mb-1">{role === "owner" ? "Owner ID" : "Email"}</label>
          <input
            name="identifier" value={form.identifier} onChange={handleChange} required
            type={role === "owner" ? "text" : "email"}
            className="w-full rounded-lg border border-gold-100 px-4 py-2.5 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300"
          />
        </div>
        <div>
          <label className="text-sm text-ink/60 block mb-1">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gold-100 px-4 py-2.5 pr-12 bg-cream focus:outline-none focus:ring-2 focus:ring-gold-300"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-wine-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      {role === "customer" && (
        <p className="text-center text-sm text-ink/60 mt-5">
          New here? <Link to="/signup" className="text-wine-700 hover:underline">Create an account</Link>
        </p>
      )}
      {role === "owner" && (
        <p className="text-center text-xs text-ink/40 mt-5">
          Owner credentials are pre-configured. Contact the developer if you've lost them.
        </p>
      )}
    </div>
  );
}
