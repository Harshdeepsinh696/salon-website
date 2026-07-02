const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const generateToken = require("../utils/generateToken");
const { isEmail, isNonEmpty } = require("../utils/validators");

function toSafeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}

// POST /api/auth/customer/signup
const customerSignup = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!isNonEmpty(name) || !isEmail(email) || !isNonEmpty(password)) {
    res.status(400);
    throw new Error("Name, a valid email, and password are required.");
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    res.status(409);
    throw new Error("An account with this email already exists.");
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, phone, password: hashed, role: "customer" });

  res.status(201).json({ user: toSafeUser(user), token: generateToken(user) });
});

// POST /api/auth/customer/login
const customerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, role: "customer" } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  res.json({ user: toSafeUser(user), token: generateToken(user) });
});

// POST /api/auth/owner/login
// The owner account is never created via signup — it's seeded once
// (see prisma-free seed.js) with credentials from .env.
const ownerLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { ownerUsername: username, role: "owner" } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid owner ID or password.");
  }

  res.json({ user: toSafeUser(user), token: generateToken(user) });
});

module.exports = { customerSignup, customerLogin, ownerLogin };
