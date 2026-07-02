require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/db");
const { PORT } = require("./src/config/env");
require("./src/models"); // ensure associations are registered

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // sync() creates tables if they don't exist yet.
    // Use migrations instead of sync({ force/alter }) in production.
    await sequelize.sync();
    console.log("✅ Models synced");

    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
