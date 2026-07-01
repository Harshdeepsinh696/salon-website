export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatTime(time) {
  return time; // expects "HH:mm" strings from the backend already formatted
}

export function nextNDays(n = 14) {
  return Array.from({ length: n }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
}
