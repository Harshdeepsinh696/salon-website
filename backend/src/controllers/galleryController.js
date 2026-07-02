const asyncHandler = require("express-async-handler");
const { Gallery } = require("../models");

const getGallery = asyncHandler(async (req, res) => {
  const images = await Gallery.findAll({ order: [["createdAt", "DESC"]] });
  res.json(images);
});

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("An image file is required.");
  }
  const url = `/uploads/${req.file.filename}`;
  const image = await Gallery.create({ url, caption: req.body.caption || req.file.originalname });
  res.status(201).json(image);
});

const deleteImage = asyncHandler(async (req, res) => {
  const image = await Gallery.findByPk(req.params.id);
  if (!image) {
    res.status(404);
    throw new Error("Image not found.");
  }
  await image.destroy();
  res.json({ message: "Image deleted." });
});

module.exports = { getGallery, uploadImage, deleteImage };
