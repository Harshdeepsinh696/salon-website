import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const fallback = [
  { id: 1, name: "Hair Cut" },
  { id: 4, name: "Facial" },
];

export default function FavoriteServices() {
  const [favorites, setFavorites] = useState(fallback);

  // TODO: replace with a real endpoint, e.g. userService.getFavorites()
  useEffect(() => {}, []);

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-6">Favorite Services</h1>
      {favorites.length === 0 ? (
        <p className="text-ink/60">You haven't saved any favorites yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {favorites.map((f) => (
            <div key={f.id} className="card flex items-center justify-between">
              <span className="font-medium text-ink">{f.name}</span>
              <Link to="/book" state={{ serviceId: f.id }} className="text-sm text-wine-700 hover:underline">Book Again</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
