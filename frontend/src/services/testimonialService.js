import api from "./api";

export const testimonialService = {
  getAll: () => api.get("/testimonials"),
  create: (data) => api.post("/testimonials", data),
  remove: (id) => api.delete(`/testimonials/${id}`),
};
