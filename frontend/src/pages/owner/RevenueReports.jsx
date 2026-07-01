import { useEffect, useState } from "react";
import { userService } from "../../services/userService";

const fallback = { today: 4200, week: 26500, month: 86400, byService: [
  { name: "Hair Coloring", amount: 22000 },
  { name: "Facial", amount: 15500 },
  { name: "Hair Cut", amount: 13200 },
  { name: "Makeup", amount: 12000 },
]};

export default function RevenueReports() {
  const [range, setRange] = useState("month");
  const [data, setData] = useState(fallback);

  useEffect(() => {
    userService.getRevenue(range).then((res) => setData(res.data || fallback)).catch(() => setData(fallback));
  }, [range]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl text-wine-700">Revenue</h1>
        <div className="flex bg-gold-100 rounded-full p-1">
          {["today", "week", "month"].map((r) => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-full text-sm capitalize ${range === r ? "bg-wine-600 text-cream" : "text-wine-700"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="card mb-8">
        <p className="text-sm text-ink/60">{range === "today" ? "Today" : range === "week" ? "This Week" : "This Month"}</p>
        <p className="text-4xl font-display text-wine-700 mt-1">₹{data[range]?.toLocaleString("en-IN")}</p>
      </div>

      <h3 className="text-lg text-wine-700 mb-4">By Service</h3>
      <div className="space-y-3">
        {data.byService?.map((s) => (
          <div key={s.name} className="flex items-center gap-4">
            <span className="w-32 text-sm text-ink/70 shrink-0">{s.name}</span>
            <div className="flex-1 bg-gold-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-wine-600 rounded-full"
                style={{ width: `${(s.amount / data.byService[0].amount) * 100}%` }}
              />
            </div>
            <span className="text-sm text-ink/60 w-20 text-right">₹{s.amount.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
