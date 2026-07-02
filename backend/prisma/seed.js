/**
 * Seeds the database with:
 *  - the default OWNER account (credentials come from .env)
 *  - a starter list of services matching the salon's menu
 *
 * Run with: npm run seed
 * (Despite living in /prisma for folder-structure continuity, this project
 * uses Sequelize, not Prisma — see src/config/db.js.)
 */
require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelize = require("../src/config/db");
const { User, Service } = require("../src/models");
const { DEFAULT_OWNER_ID, DEFAULT_OWNER_PASSWORD } = require("../src/config/env");

const defaultServices = [
  { name: "Hair Cut", category: "Hair", price: 150, duration: 30 },
  { name: "Hair Styling", category: "Hair", price: 300, duration: 45 },
  { name: "Hair Coloring", category: "Hair", price: 800, duration: 90 },
  { name: "Facial", category: "Skin", price: 500, duration: 45 },
  { name: "Makeup", category: "Beauty", price: 1200, duration: 60 },
  { name: "Manicure", category: "Nails", price: 400, duration: 40 },
  { name: "Pedicure", category: "Nails", price: 450, duration: 40 },
  { name: "Beard Trim", category: "Men", price: 100, duration: 20 },
];

async function seed() {
  await sequelize.sync();

  const existingOwner = await User.findOne({ where: { role: "owner" } });
  if (!existingOwner) {
    const hashed = await bcrypt.hash(DEFAULT_OWNER_PASSWORD, 10);
    await User.create({
      name: "Sanju (Owner)",
      ownerUsername: DEFAULT_OWNER_ID,
      password: hashed,
      role: "owner",
    });
    console.log(`✅ Owner account created — ID: "${DEFAULT_OWNER_ID}" / Password: "${DEFAULT_OWNER_PASSWORD}"`);
  } else {
    console.log("ℹ️  Owner account already exists, skipping.");
  }

  const serviceCount = await Service.count();
  if (serviceCount === 0) {
    await Service.bulkCreate(defaultServices);
    console.log(`✅ Seeded ${defaultServices.length} default services.`);
  } else {
    console.log("ℹ️  Services already exist, skipping.");
  }

  await sequelize.close();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
