import api from "./api";

export const appointmentService = {
  getAvailableSlots: (date, serviceId) => api.get("/appointments/slots", { params: { date, serviceId } }),
  book: (data) => api.post("/appointments", data),
  getMyAppointments: () => api.get("/appointments/mine"),
  getAll: () => api.get("/appointments"), // owner only
  cancel: (id) => api.patch(`/appointments/${id}/cancel`),
  reschedule: (id, data) => api.patch(`/appointments/${id}/reschedule`, data),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
  export: () => api.get("/appointments/export", { responseType: "blob" }),
};
