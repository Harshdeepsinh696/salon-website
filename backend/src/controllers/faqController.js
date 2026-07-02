const asyncHandler = require("express-async-handler");
const { FAQ } = require("../models");

const getFAQs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.findAll({ order: [["createdAt", "ASC"]] });
  res.json(faqs);
});

const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    res.status(400);
    throw new Error("question and answer are required.");
  }
  const faq = await FAQ.create({ question, answer });
  res.status(201).json(faq);
});

const deleteFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByPk(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error("FAQ not found.");
  }
  await faq.destroy();
  res.json({ message: "FAQ deleted." });
});

module.exports = { getFAQs, createFAQ, deleteFAQ };
