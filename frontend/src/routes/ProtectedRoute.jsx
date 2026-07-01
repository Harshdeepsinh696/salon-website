import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Blocks access until someone is logged in (either role). */
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // could render a spinner here
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}
