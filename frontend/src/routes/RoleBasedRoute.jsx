import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Restricts a subtree to a specific role, e.g. <RoleBasedRoute role="owner" /> */
export default function RoleBasedRoute({ role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;

  return <Outlet />;
}
