const express = require("express");
const {
  getSlots, bookAppointment, getMyAppointments, getAllAppointments,
  cancelAppointment, rescheduleAppointment, updateStatus, exportAppointments,
} = require("../controllers/appointmentController");
const { protect } = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/slots", getSlots);
router.post("/", protect, requireRole("customer"), bookAppointment);
router.get("/mine", protect, requireRole("customer"), getMyAppointments);
router.get("/export", protect, requireRole("owner"), exportAppointments);
router.get("/", protect, requireRole("owner"), getAllAppointments);
router.patch("/:id/cancel", protect, requireRole("customer"), cancelAppointment);
router.patch("/:id/reschedule", protect, requireRole("customer"), rescheduleAppointment);
router.patch("/:id/status", protect, requireRole("owner"), updateStatus);

module.exports = router;
