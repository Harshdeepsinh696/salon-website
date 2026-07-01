import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const customerLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/book", label: "Book Appointment" },
  { to: "/dashboard", label: "My Dashboard" },
];

const ownerLinks = [
  { to: "/", label: "Home" },
  { to: "/owner", label: "Owner Dashboard" },
  { to: "/owner/appointments", label: "Appointments" },
  { to: "/owner/services", label: "Services" },
  { to: "/owner/gallery", label: "Gallery" },
];

export default function Navbar() {
  const { user, isOwner, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = !user ? publicLinks : isOwner ? ownerLinks : customerLinks;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-gold-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-xl text-wine-700 tracking-wide">
          Sanju&apos;s <span className="text-gold-600">Family Salon</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-body text-ink/80">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `hover:text-wine-600 transition-colors ${isActive ? "text-wine-700 font-medium" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="text-sm text-wine-700 hover:underline">Login</Link>
              <Link to="/signup" className="btn-primary text-sm py-2">Sign Up</Link>
            </>
          ) : (
            <>
              <span className="text-sm text-ink/60">Hi, {user.name?.split(" ")[0]}</span>
              <button onClick={handleLogout} className="btn-outline text-sm py-2">Logout</button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-wine-700"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-gold-100 px-5 py-4 flex flex-col gap-4 fade-in">
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-ink/80">
              {link.label}
            </Link>
          ))}
          {!user ? (
            <div className="flex gap-3 pt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="btn-outline flex-1 text-center text-sm py-2">Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary flex-1 text-center text-sm py-2">Sign Up</Link>
            </div>
          ) : (
            <button onClick={() => { setOpen(false); handleLogout(); }} className="btn-outline text-sm py-2">Logout</button>
          )}
        </div>
      )}
    </header>
  );
}
