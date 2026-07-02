const asyncHandler = require("express-async-handler");
const { Service } = require("../models");

const getServices = asyncHandler(async (req, res) => {
  const services = await Service.findAll({ order: [["category", "ASC"], ["name", "ASC"]] });
  res.json(services);
});

const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }
  res.json(service);
});

const createService = asyncHandler(async (req, res) => {
  const { name, category, price, duration } = req.body;
  if (!name || !category || price == null || duration == null) {
    res.status(400);
    throw new Error("name, category, price, and duration are required.");
  }
  const service = await Service.create({ name, category, price, duration });
  res.status(201).json(service);
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }
  await service.update(req.body);
  res.json(service);
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }
  await service.destroy();
  res.json({ message: "Service deleted." });
});

module.exports = { getServices, getServiceById, createService, updateService, deleteService };
