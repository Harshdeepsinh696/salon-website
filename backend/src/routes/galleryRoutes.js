const express = require("express");
const { getGallery, uploadImage, deleteImage } = require("../controllers/galleryController");
const { protect } = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/", getGallery);
router.post("/", protect, requireRole("owner"), upload.single("image"), uploadImage);
router.delete("/:id", protect, requireRole("owner"), deleteImage);

module.exports = router;
