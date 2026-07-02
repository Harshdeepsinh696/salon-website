const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Testimonial = sequelize.define("Testimonial", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customer: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 5 },
}, {
  tableName: "testimonials",
  timestamps: true,
});

module.exports = Testimonial;
