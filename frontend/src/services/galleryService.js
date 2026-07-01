import api from "./api";

export const galleryService = {
  getAll: () => api.get("/gallery"),
  upload: (formData) => api.post("/gallery", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  remove: (id) => api.delete(`/gallery/${id}`),
};
