const asyncHandler = require("express-async-handler");
const { Parser } = require("json2csv");
const { Appointment, Service, User } = require("../models");
const { getAvailableSlots, assertSlotIsBookable } = require("../services/slotAvailabilityService");

// GET /api/appointments/slots?date=YYYY-MM-DD&serviceId=1
const getSlots = asyncHandler(async (req, res) => {
  const { date } = req.query;
  if (!date) {
    res.status(400);
    throw new Error("date is required (YYYY-MM-DD).");
  }
  const slots = await getAvailableSlots(date);
  res.json(slots);
});

// POST /api/appointments  (customer)
const bookAppointment = asyncHandler(async (req, res) => {
  const { serviceId, date, time, notes } = req.body;
  if (!serviceId || !date || !time) {
    res.status(400);
    throw new Error("serviceId, date, and time are required.");
  }

  const service = await Service.findByPk(serviceId);
  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  await assertSlotIsBookable(date, time);

  const appointment = await Appointment.create({
    customerId: req.user.id,
    serviceId,
    date,
    time,
    notes,
    status: "pending",
  });

  res.status(201).json(appointment);
});

// GET /api/appointments/mine  (customer)
const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.findAll({
    where: { customerId: req.user.id },
    include: [{ model: Service, as: "service" }],
    order: [["date", "DESC"], ["time", "DESC"]],
  });

  res.json(
    appointments.map((a) => ({
      id: a.id,
      service: a.service?.name,
      date: a.date,
      time: a.time,
      status: a.status,
      notes: a.notes,
    }))
  );
});

// GET /api/appointments  (owner)
const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.findAll({
    include: [
      { model: Service, as: "service" },
      { model: User, as: "customer" },
    ],
    order: [["date", "DESC"], ["time", "DESC"]],
  });

  res.json(
    appointments.map((a) => ({
      id: a.id,
      customer: a.customer?.name,
      service: a.service?.name,
      date: a.date,
      time: a.time,
      status: a.status,
    }))
  );
});

// PATCH /api/appointments/:id/cancel  (customer)
const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findOne({ where: { id: req.params.id, customerId: req.user.id } });
  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found.");
  }
  appointment.status = "cancelled";
  await appointment.save();
  res.json(appointment);
});

// PATCH /api/appointments/:id/reschedule  (customer)
const rescheduleAppointment = asyncHandler(async (req, res) => {
  const { date, time } = req.body;
  const appointment = await Appointment.findOne({ where: { id: req.params.id, customerId: req.user.id } });
  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found.");
  }
  await assertSlotIsBookable(date, time);
  appointment.date = date;
  appointment.time = time;
  appointment.status = "pending"; // owner re-confirms after a reschedule
  await appointment.save();
  res.json(appointment);
});

// PATCH /api/appointments/:id/status  (owner)
const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["pending", "confirmed", "completed", "cancelled"];
  if (!allowed.includes(status)) {
    res.status(400);
    throw new Error(`status must be one of: ${allowed.join(", ")}`);
  }
  const appointment = await Appointment.findByPk(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found.");
  }
  appointment.status = status;
  await appointment.save();
  res.json(appointment);
});

// GET /api/appointments/export  (owner)
const exportAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.findAll({
    include: [
      { model: Service, as: "service" },
      { model: User, as: "customer" },
    ],
    order: [["date", "DESC"]],
  });

  const rows = appointments.map((a) => ({
    id: a.id,
    customer: a.customer?.name,
    email: a.customer?.email,
    service: a.service?.name,
    date: a.date,
    time: a.time,
    status: a.status,
  }));

  const parser = new Parser();
  const csv = parser.parse(rows);

  res.header("Content-Type", "text/csv");
  res.attachment("appointments.csv");
  res.send(csv);
});

module.exports = {
  getSlots,
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  cancelAppointment,
  rescheduleAppointment,
  updateStatus,
  exportAppointments,
};
