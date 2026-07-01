import api from "./api";

export const authService = {
  customerLogin: (email, password) => api.post("/auth/customer/login", { email, password }),
  customerSignup: (data) => api.post("/auth/customer/signup", data),
  ownerLogin: (username, password) => api.post("/auth/owner/login", { username, password }),
};
