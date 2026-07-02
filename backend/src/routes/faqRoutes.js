const express = require("express");
const { getFAQs, createFAQ, deleteFAQ } = require("../controllers/faqController");
const { protect } = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", getFAQs);
router.post("/", protect, requireRole("owner"), createFAQ);
router.delete("/:id", protect, requireRole("owner"), deleteFAQ);

module.exports = router;
