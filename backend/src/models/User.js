const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

/**
 * A single table holds both customers and the owner, distinguished by `role`.
 * The owner row is created once by the seed script (default credentials in .env)
 * and is not created through the signup form.
 */
const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: true },
  ownerUsername: { type: DataTypes.STRING, unique: true, allowNull: true }, // owner login "ID"
  phone: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("customer", "owner"), defaultValue: "customer" },
}, {
  tableName: "users",
  timestamps: true,
});

module.exports = User;
