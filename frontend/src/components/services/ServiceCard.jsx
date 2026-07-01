import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <div className="card flex flex-col justify-between">
      <div>
        <p className="font-display text-lg text-ink">{service.name}</p>
        <p className="text-sm text-ink/50 mt-1">{service.duration} mins</p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <span className="text-wine-600 font-medium">₹{service.price}</span>
        <Link to="/book" state={{ serviceId: service.id }} className="text-sm text-gold-600 hover:underline">
          Book →
        </Link>
      </div>
    </div>
  );
}
