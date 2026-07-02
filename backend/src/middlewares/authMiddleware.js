const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const { User } = require("../models");

/** Verifies the JWT and attaches the logged-in user to req.user */
async function protect(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: "Not authorized, user not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
}

module.exports = { protect };
