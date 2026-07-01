import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

/**
 * Holds the logged-in user (customer or owner) and exposes login/logout.
 * role is either "customer" or "owner" - the header/nav reads this to
 * decide which links to show.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, role }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("sfs_user");
    const storedToken = localStorage.getItem("sfs_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("sfs_user", JSON.stringify(userData));
    localStorage.setItem("sfs_token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sfs_user");
    localStorage.removeItem("sfs_token");
  };

  const isOwner = user?.role === "owner";
  const isCustomer = user?.role === "customer";

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isOwner, isCustomer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
