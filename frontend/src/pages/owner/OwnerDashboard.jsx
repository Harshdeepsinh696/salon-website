import { Link } from "react-router-dom";

const stats = [
  { label: "Today's Appointments", value: 12, to: "/owner/appointments" },
  { label: "Pending Approvals", value: 3, to: "/owner/appointments" },
  { label: "Total Customers", value: 248, to: "/owner/customers" },
  { label: "This Month's Revenue", value: "₹86,400", to: "/owner/revenue" },
];

export default function OwnerDashboard() {
  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-1">Owner Overview</h1>
      <p className="text-ink/60 mb-8">A snapshot of how the salon is doing today.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="card hover:border-gold-300 transition-colors">
            <p className="text-2xl font-display text-wine-700">{s.value}</p>
            <p className="text-sm text-ink/60 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
