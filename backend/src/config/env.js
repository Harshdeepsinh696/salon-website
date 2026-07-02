require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  DEFAULT_OWNER_ID: process.env.DEFAULT_OWNER_ID || "owner",
  DEFAULT_OWNER_PASSWORD: process.env.DEFAULT_OWNER_PASSWORD || "Sanju@Admin123",
};
