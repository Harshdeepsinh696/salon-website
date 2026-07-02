const express = require("express");
const { getTestimonials, createTestimonial, deleteTestimonial } = require("../controllers/testimonialController");
const { protect } = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", createTestimonial); // any logged-in-or-not visitor can leave one; owner moderates via delete
router.delete("/:id", protect, requireRole("owner"), deleteTestimonial);

module.exports = router;
