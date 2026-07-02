const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Appointment = sequelize.define("Appointment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false }, // "HH:mm"
  notes: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
    defaultValue: "pending",
  },
}, {
  tableName: "appointments",
  timestamps: true,
});

module.exports = Appointment;
