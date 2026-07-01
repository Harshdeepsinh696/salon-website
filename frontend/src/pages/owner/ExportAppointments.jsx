import { useState } from "react";
import Button from "../../components/common/Button";
import { appointmentService } from "../../services/appointmentService";

export default function ExportAppointments() {
  const [downloading, setDownloading] = useState(false);

  const handleExport = async () => {
    setDownloading(true);
    try {
      const res = await appointmentService.export();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "appointments.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Export isn't wired to the backend yet.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-6">Export Appointments</h1>
      <div className="card max-w-md">
        <p className="text-ink/60 mb-5">Download all appointment records as a CSV file for offline records or accounting.</p>
        <Button onClick={handleExport} disabled={downloading}>
          {downloading ? "Preparing file..." : "Export as CSV"}
        </Button>
      </div>
    </div>
  );
}
