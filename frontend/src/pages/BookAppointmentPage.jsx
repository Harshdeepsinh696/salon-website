import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import DatePicker from "../components/booking/DatePicker";
import TimeSlotPicker from "../components/booking/TimeSlotPicker";
import BookingForm from "../components/booking/BookingForm";
import { useAuth } from "../context/AuthContext";
import { serviceService } from "../services/serviceService";
import { appointmentService } from "../services/appointmentService";

const fallbackServices = [
  { id: 1, name: "Hair Cut", duration: 30 },
  { id: 2, name: "Hair Styling", duration: 45 },
  { id: 3, name: "Hair Coloring", duration: 90 },
  { id: 4, name: "Facial", duration: 45 },
  { id: 5, name: "Makeup", duration: 60 },
  { id: 6, name: "Manicure", duration: 40 },
  { id: 7, name: "Pedicure", duration: 40 },
  { id: 8, name: "Beard Trim", duration: 20 },
];

// Static fallback slots — normally generated server-side around opening
// hours, buffer time, and max bookings per slot.
const fallbackSlots = ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "16:30", "17:00"];

export default function BookAppointmentPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [services, setServices] = useState(fallbackServices);
  const [serviceId, setServiceId] = useState(location.state?.serviceId || "");
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    serviceService.getAll().then((res) => setServices(res.data?.length ? res.data : fallbackServices)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!date || !serviceId) return;
    appointmentService
      .getAvailableSlots(date.toISOString().slice(0, 10), serviceId)
      .then((res) => setSlots(res.data?.length ? res.data : fallbackSlots))
      .catch(() => setSlots(fallbackSlots));
  }, [date, serviceId]);

  const handleBook = async () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await appointmentService.book({ serviceId, date: date.toISOString().slice(0, 10), time, notes });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Could not book this slot. Please try another time.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <h1 className="text-3xl text-wine-700 mb-3">Appointment Booked 🎉</h1>
        <p className="text-ink/60 mb-8">We've sent the details to your dashboard. See you soon!</p>
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-20">
      <SectionHeading eyebrow="Reserve Your Seat" title="Book Appointment" />

      <div className="card space-y-8">
        <div>
          <h3 className="text-sm font-medium text-wine-700 mb-3">1. Choose a Service</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setServiceId(s.id)}
                className={`text-left px-4 py-3 rounded-lg border transition-colors ${
                  serviceId === s.id ? "border-wine-600 bg-wine-50" : "border-gold-100 hover:border-gold-300"
                }`}
              >
                <p className="font-medium text-ink">{s.name}</p>
                <p className="text-xs text-ink/50">{s.duration} mins</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-wine-700 mb-3">2. Choose a Date</h3>
          <DatePicker selectedDate={date} onSelect={setDate} />
        </div>

        {date && serviceId && (
          <div>
            <h3 className="text-sm font-medium text-wine-700 mb-3">3. Choose a Time Slot</h3>
            <TimeSlotPicker slots={slots} selectedTime={time} onSelect={setTime} />
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        {time && (
          <BookingForm
            notes={notes}
            onNotesChange={setNotes}
            onSubmit={handleBook}
            disabled={!serviceId || !date || !time || submitting}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}
