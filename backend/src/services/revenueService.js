const { Appointment, Service } = require("../models");
const { Op } = require("sequelize");

function startOfRange(range) {
  const now = new Date();
  if (range === "today") {
    now.setHours(0, 0, 0, 0);
    return now;
  }
  if (range === "week") {
    const d = new Date(now);
    d.setDate(d.getDate() - 7);
    return d;
  }
  // month (default)
  const d = new Date(now);
  d.setDate(d.getDate() - 30);
  return d;
}

async function getRevenue(range = "month") {
  const since = startOfRange(range).toISOString().slice(0, 10);

  const appointments = await Appointment.findAll({
    where: { status: "completed", date: { [Op.gte]: since } },
    include: [{ model: Service, as: "service" }],
  });

  const total = appointments.reduce((sum, a) => sum + (a.service?.price || 0), 0);

  const byServiceMap = {};
  appointments.forEach((a) => {
    if (!a.service) return;
    byServiceMap[a.service.name] = (byServiceMap[a.service.name] || 0) + a.service.price;
  });
  const byService = Object.entries(byServiceMap)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount);

  return { [range]: total, byService };
}

module.exports = { getRevenue };
