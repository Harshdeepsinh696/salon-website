import { useEffect, useState } from "react";
import { appointmentService } from "../../services/appointmentService";
import Loader from "../../components/common/Loader";

const fallback = [
  { id: 1, customer: "Riya Shah", service: "Hair Coloring", date: "2026-07-01", time: "11:00", status: "pending" },
  { id: 2, customer: "Aman Patel", service: "Beard Trim", date: "2026-07-01", time: "12:00", status: "confirmed" },
  { id: 3, customer: "Meera Joshi", service: "Facial", date: "2026-07-02", time: "15:00", status: "pending" },
];

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState(fallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    appointmentService
      .getAll()
      .then((res) => setAppointments(res.data?.length ? res.data : fallback))
      .catch(() => setAppointments(fallback))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    try {
      await appointmentService.updateStatus(id, status);
    } catch {
      // TODO: revert + toast on failure
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-6">Manage Appointments</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink/50 border-b border-gold-100">
              <th className="py-2">Customer</th>
              <th className="py-2">Service</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b border-gold-100/60">
                <td className="py-3">{a.customer}</td>
                <td className="py-3">{a.service}</td>
                <td className="py-3">{a.date}</td>
                <td className="py-3">{a.time}</td>
                <td className="py-3">
                  <select
                    value={a.status}
                    onChange={(e) => updateStatus(a.id, e.target.value)}
                    className="border border-gold-100 rounded-lg px-2 py-1 bg-cream text-sm capitalize"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
