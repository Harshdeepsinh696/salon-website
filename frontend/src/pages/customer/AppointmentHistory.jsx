import { useEffect, useState } from "react";
import { appointmentService } from "../../services/appointmentService";
import Loader from "../../components/common/Loader";

const fallback = [
  { id: 11, service: "Hair Cut", date: "2026-05-02", time: "10:00", status: "completed" },
  { id: 12, service: "Beard Trim", date: "2026-04-14", time: "12:30", status: "completed" },
  { id: 13, service: "Manicure", date: "2026-03-28", time: "16:00", status: "cancelled" },
];

export default function AppointmentHistory() {
  const [history, setHistory] = useState(fallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    appointmentService
      .getMyAppointments()
      .then((res) => setHistory(res.data?.length ? res.data : fallback))
      .catch(() => setHistory(fallback))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-6">Appointment History</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink/50 border-b border-gold-100">
              <th className="py-2">Service</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((a) => (
              <tr key={a.id} className="border-b border-gold-100/60">
                <td className="py-3">{a.service}</td>
                <td className="py-3">{a.date}</td>
                <td className="py-3">{a.time}</td>
                <td className="py-3 capitalize">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
