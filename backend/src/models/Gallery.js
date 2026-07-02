const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Gallery = sequelize.define("Gallery", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  caption: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: "gallery_images",
  timestamps: true,
});

module.exports = Gallery;
