require("dotenv").config();

const bcrypt = require("bcryptjs");
const sequelize = require("./src/config/db");
const { User } = require("./src/models");

async function createOwner() {
  await sequelize.authenticate();

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Salon Owner",
    ownerUsername: "admin",
    password: hashedPassword,
    role: "owner",
  });

  console.log("Owner created successfully!");
  console.log("Username: admin");
  console.log("Password: Admin@123");

  process.exit();
}

createOwner().catch(console.error);