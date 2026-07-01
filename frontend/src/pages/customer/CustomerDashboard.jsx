import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CustomerDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: "Upcoming", value: 2, to: "/dashboard/upcoming" },
    { label: "Past Visits", value: 14, to: "/dashboard/history" },
    { label: "Favorite Services", value: 3, to: "/dashboard/favorites" },
  ];

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-1">Welcome back, {user?.name?.split(" ")[0] || "there"} 👋</h1>
      <p className="text-ink/60 mb-8">Here's a quick look at your salon activity.</p>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="card hover:border-gold-300 transition-colors">
            <p className="text-3xl font-display text-wine-700">{s.value}</p>
            <p className="text-sm text-ink/60 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <Link to="/book" className="btn-primary">Book a New Appointment</Link>
    </div>
  );
}
