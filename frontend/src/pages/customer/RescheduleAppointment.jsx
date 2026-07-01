import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { appointmentService } from "../../services/appointmentService";
import { nextNDays } from "../../utils/dateUtils";

const fallbackSlots = ["10:00", "10:30", "11:00", "14:00", "14:30", "16:00"];

export default function RescheduleAppointment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const appointment = state?.appointment;

  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const days = nextNDays(10);

  if (!appointment) {
    return (
      <div>
        <p className="text-ink/60">No appointment selected. Go back to your upcoming appointments to reschedule one.</p>
        <Button className="mt-4" onClick={() => navigate("/dashboard/upcoming")}>Back to Upcoming</Button>
      </div>
    );
  }

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await appointmentService.reschedule(appointment.id, {
        date: date.toISOString().slice(0, 10),
        time,
      });
      navigate("/dashboard/upcoming");
    } catch {
      // TODO: surface error toast
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-2">Reschedule Appointment</h1>
      <p className="text-ink/60 mb-6">{appointment.service} — currently {appointment.date} at {appointment.time}</p>

      <div className="card space-y-6">
        <div>
          <h3 className="text-sm font-medium text-wine-700 mb-3">New Date</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {days.map((d) => (
              <button
                key={d.toISOString()}
                onClick={() => setDate(d)}
                className={`shrink-0 w-16 py-2 rounded-lg border text-center text-sm ${
                  date && d.toDateString() === date.toDateString() ? "border-wine-600 bg-wine-600 text-cream" : "border-gold-100"
                }`}
              >
                <div className="text-xs">{d.toLocaleDateString("en-IN", { weekday: "short" })}</div>
                <div className="font-medium">{d.getDate()}</div>
              </button>
            ))}
          </div>
        </div>

        {date && (
          <div>
            <h3 className="text-sm font-medium text-wine-700 mb-3">New Time</h3>
            <div className="flex flex-wrap gap-2">
              {fallbackSlots.map((s) => (
                <button
                  key={s}
                  onClick={() => setTime(s)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    time === s ? "border-wine-600 bg-wine-600 text-cream" : "border-gold-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button onClick={handleSubmit} disabled={!date || !time || submitting} className="w-full">
          {submitting ? "Saving..." : "Confirm New Time"}
        </Button>
      </div>
    </div>
  );
}
