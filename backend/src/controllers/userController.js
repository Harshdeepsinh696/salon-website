const asyncHandler = require("express-async-handler");
const { User, Appointment } = require("../models");
const { getRevenue } = require("../services/revenueService");

const getMyProfile = asyncHandler(async (req, res) => {
  const { id, name, email, phone, role } = req.user;
  res.json({ id, name, email, phone, role });
});

const updateMyProfile = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  req.user.name = name ?? req.user.name;
  req.user.email = email ?? req.user.email;
  req.user.phone = phone ?? req.user.phone;
  await req.user.save();
  const { id, role } = req.user;
  res.json({ id, name: req.user.name, email: req.user.email, phone: req.user.phone, role });
});

// GET /api/users/customers  (owner)
const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await User.findAll({ where: { role: "customer" } });

  const withVisits = await Promise.all(
    customers.map(async (c) => {
      const visits = await Appointment.count({ where: { customerId: c.id, status: "completed" } });
      return { id: c.id, name: c.name, email: c.email, phone: c.phone, visits };
    })
  );

  res.json(withVisits);
});

// GET /api/users/revenue?range=today|week|month  (owner)
const getRevenueReport = asyncHandler(async (req, res) => {
  const { range = "month" } = req.query;
  const data = await getRevenue(range);
  res.json(data);
});

module.exports = { getMyProfile, updateMyProfile, getAllCustomers, getRevenueReport };
