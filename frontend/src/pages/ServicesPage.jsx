import { useEffect, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import Loader from "../components/common/Loader";
import ServiceList from "../components/services/ServiceList";
import { serviceService } from "../services/serviceService";

// Fallback data shown until the backend is connected.
const fallbackServices = [
  { id: 1, name: "Hair Cut", category: "Hair", price: 150, duration: 30 },
  { id: 2, name: "Hair Styling", category: "Hair", price: 300, duration: 45 },
  { id: 3, name: "Hair Coloring", category: "Hair", price: 800, duration: 90 },
  { id: 4, name: "Facial", category: "Skin", price: 500, duration: 45 },
  { id: 5, name: "Makeup", category: "Beauty", price: 1200, duration: 60 },
  { id: 6, name: "Manicure", category: "Nails", price: 400, duration: 40 },
  { id: 7, name: "Pedicure", category: "Nails", price: 450, duration: 40 },
  { id: 8, name: "Beard Trim", category: "Men", price: 100, duration: 20 },
];

export default function ServicesPage() {
  const [services, setServices] = useState(fallbackServices);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    serviceService
      .getAll()
      .then((res) => setServices(res.data?.length ? res.data : fallbackServices))
      .catch(() => setServices(fallbackServices))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <SectionHeading
        eyebrow="Our Menu"
        title="Services"
        subtitle="Transparent pricing, no surprises. Every service can be booked directly."
      />
      {loading ? <Loader label="Fetching services..." /> : <ServiceList services={services} />}
    </div>
  );
}
