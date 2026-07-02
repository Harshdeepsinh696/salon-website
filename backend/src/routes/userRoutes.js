const express = require("express");
const { getMyProfile, updateMyProfile, getAllCustomers, getRevenueReport } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);
router.get("/customers", protect, requireRole("owner"), getAllCustomers);
router.get("/revenue", protect, requireRole("owner"), getRevenueReport);

module.exports = router;
