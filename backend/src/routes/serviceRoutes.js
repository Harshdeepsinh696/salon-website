const express = require("express");

console.log("✅ serviceRoutes loaded");

const {
  getServices, getServiceById, createService, updateService, deleteService,
} = require("../controllers/serviceController");
const { protect } = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", protect, requireRole("owner"), createService);
router.put("/:id", protect, requireRole("owner"), updateService);
router.delete("/:id", protect, requireRole("owner"), deleteService);

module.exports = router;
