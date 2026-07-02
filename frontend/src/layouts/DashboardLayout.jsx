import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";

const customerNav = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/dashboard/upcoming", label: "Upcoming Appointments" },
  { to: "/dashboard/history", label: "Appointment History" },
  { to: "/dashboard/favorites", label: "Favorite Services" },
  { to: "/dashboard/profile", label: "Edit Profile" },
];

const ownerNav = [
  { to: "/owner", label: "Overview", end: true },
  { to: "/owner/appointments", label: "Appointments" },
  { to: "/owner/services", label: "Services" },
  { to: "/owner/customers", label: "Customers" },
  { to: "/owner/gallery", label: "Gallery" },
  { to: "/owner/testimonials", label: "Testimonials" },
  { to: "/owner/faqs", label: "FAQs" },
  { to: "/owner/revenue", label: "Revenue" },
  { to: "/owner/export", label: "Export Data" },
  { to: "/owner/content", label: "Site Content" },
];

/** Sidebar + content shell shared by Customer and Owner dashboards. */
export default function DashboardLayout() {
  const { isOwner } = useAuth();
  const items = isOwner ? ownerNav : customerNav;

  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-1 max-w-6xl w-full mx-auto grid md:grid-cols-[220px_1fr] gap-8 px-5 py-10">
        <aside className="md:sticky md:top-24 h-fit">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `whitespace-nowrap px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive ? "bg-wine-600 text-cream" : "text-ink/70 hover:bg-gold-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <section className="fade-in">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
