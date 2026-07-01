import api from "./api";

export const userService = {
  getProfile: () => api.get("/users/me"),
  updateProfile: (data) => api.put("/users/me", data),
  getAllCustomers: () => api.get("/users/customers"), // owner only
  getRevenue: (range) => api.get("/users/revenue", { params: { range } }),
};
