# Sanju's Family Salon — Backend

Node.js + Express + PostgreSQL (via Sequelize) API for the salon website.

## Setup

1. Install PostgreSQL and create a database:
   ```
   createdb sanjus_salon
   ```
2. Copy `.env` and adjust `DATABASE_URL`, `JWT_SECRET`, and owner credentials if you want.
3. Install dependencies:
   ```
   npm install
   ```
4. Seed the database (creates tables + the default owner account + starter services):
   ```
   npm run seed
   ```
5. Start the server:
   ```
   npm run dev
   ```
   API runs at http://localhost:5000/api

## Default Owner Login
Set in `.env` (`DEFAULT_OWNER_ID` / `DEFAULT_OWNER_PASSWORD`), applied the first time you run `npm run seed`.
Default out of the box: **ID:** `owner` **Password:** `Sanju@Admin123`
Change these in `.env` before seeding if you want different credentials — once seeded, changing `.env` alone won't update the existing DB row.

## Notes
- Uses Sequelize (not Prisma) — the `prisma/seed.js` path is kept only to match the originally planned folder layout.
- `sequelize.sync()` auto-creates tables on first run. For a real production setup, replace this with proper migrations.
- Appointment rules (opening hours, buffer time, max bookings per slot, holidays) live in `src/services/slotAvailabilityService.js`.
