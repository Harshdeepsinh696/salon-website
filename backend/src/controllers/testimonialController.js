const asyncHandler = require("express-async-handler");
const { Testimonial } = require("../models");

const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.findAll({ order: [["createdAt", "DESC"]] });
  res.json(testimonials);
});

const createTestimonial = asyncHandler(async (req, res) => {
  const { customer, text, rating } = req.body;
  if (!customer || !text) {
    res.status(400);
    throw new Error("customer and text are required.");
  }
  const testimonial = await Testimonial.create({ customer, text, rating: rating || 5 });
  res.status(201).json(testimonial);
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByPk(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found.");
  }
  await testimonial.destroy();
  res.json({ message: "Testimonial deleted." });
});

module.exports = { getTestimonials, createTestimonial, deleteTestimonial };
