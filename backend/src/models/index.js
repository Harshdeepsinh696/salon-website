const sequelize = require("../config/db");
const User = require("./User");
const Service = require("./Service");
const Appointment = require("./Appointment");
const Gallery = require("./Gallery");
const Testimonial = require("./Testimonial");
const FAQ = require("./FAQ");

// Relationships
User.hasMany(Appointment, { foreignKey: "customerId", as: "appointments" });
Appointment.belongsTo(User, { foreignKey: "customerId", as: "customer" });

Service.hasMany(Appointment, { foreignKey: "serviceId", as: "appointments" });
Appointment.belongsTo(Service, { foreignKey: "serviceId", as: "service" });

module.exports = { sequelize, User, Service, Appointment, Gallery, Testimonial, FAQ };
