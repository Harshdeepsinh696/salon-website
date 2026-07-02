const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Service = sequelize.define("Service", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false, comment: "minutes" },
}, {
  tableName: "services",
  timestamps: true,
});

module.exports = Service;
