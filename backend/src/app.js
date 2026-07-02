const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const { CLIENT_URL } = require("./config/env");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const faqRoutes = require("./routes/faqRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

app.get("/api/test", (req, res) => {
  res.send("API TEST WORKING");
});

app.get("/api/health-check", (req, res) => {
  res.json({
    status: "ok",
    message: "Health check is working!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;