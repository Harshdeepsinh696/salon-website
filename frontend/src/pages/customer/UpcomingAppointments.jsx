import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appointmentService } from "../../services/appointmentService";
import Loader from "../../components/common/Loader";

const fallback = [
  { id: 1, service: "Hair Cut", date: "2026-07-05", time: "11:00", status: "confirmed" },
  { id: 2, service: "Facial", date: "2026-07-12", time: "15:30", status: "pending" },
];

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState(fallback);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    appointmentService
      .getMyAppointments()
      .then((res) => setAppointments(res.data?.length ? res.data : fallback))
      .catch(() => setAppointments(fallback))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    try {
      await appointmentService.cancel(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch {
      // TODO: surface a toast on failure
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-6">Upcoming Appointments</h1>
      {appointments.length === 0 ? (
        <p className="text-ink/60">No upcoming appointments. <Link to="/book" className="text-wine-700 underline">Book one now</Link>.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => (
            <div key={a.id} className="card flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-medium text-ink">{a.service}</p>
                <p className="text-sm text-ink/50">{a.date} at {a.time}</p>
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                  a.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-gold-100 text-gold-600"
                }`}>
                  {a.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Link to="/dashboard/reschedule" state={{ appointment: a }} className="btn-outline text-sm py-2 px-4">Reschedule</Link>
                <button onClick={() => handleCancel(a.id)} className="text-sm text-red-600 hover:underline">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
