import { useEffect, useState } from "react";
import { userService } from "../../services/userService";

const fallback = [
  { id: 1, name: "Riya Shah", email: "riya@example.com", phone: "9876543210", visits: 8 },
  { id: 2, name: "Aman Patel", email: "aman@example.com", phone: "9876500000", visits: 3 },
];

export default function ManageCustomers() {
  const [customers, setCustomers] = useState(fallback);

  useEffect(() => {
    userService.getAllCustomers().then((res) => setCustomers(res.data?.length ? res.data : fallback)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-wine-700 mb-6">Customers</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink/50 border-b border-gold-100">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Visits</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-gold-100/60">
                <td className="py-3">{c.name}</td>
                <td className="py-3">{c.email}</td>
                <td className="py-3">{c.phone}</td>
                <td className="py-3">{c.visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
