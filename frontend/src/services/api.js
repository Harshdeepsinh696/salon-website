import axios from "axios";

// Base axios instance pointing at the backend (Node.js + Express).
// Update VITE_API_URL in .env once the backend is deployed.

//temp change
console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT token (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sfs_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Central error handling: if the token expires, log the user out.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("sfs_token");
      localStorage.removeItem("sfs_user");
    }
    return Promise.reject(err);
  }
);

export default api;
