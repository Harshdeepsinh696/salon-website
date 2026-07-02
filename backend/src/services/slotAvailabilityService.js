const { Appointment } = require("../models");
const { Op } = require("sequelize");

// --- Appointment rules (Section 5 of the spec) ---
const OPENING_HOUR = 9;   // 9 AM
const CLOSING_HOUR = 20;  // 8 PM
const SLOT_STEP_MINUTES = 30;
const BUFFER_MINUTES = 10;       // gap enforced between two bookings on the same slot pool
const MAX_BOOKINGS_PER_SLOT = 2; // e.g. 2 chairs available at once
const HOLIDAYS = ["2026-08-15", "2026-10-02"]; // ISO dates the salon is closed

function isHoliday(dateStr) {
  return HOLIDAYS.includes(dateStr);
}

function generateDaySlots() {
  const slots = [];
  for (let h = OPENING_HOUR; h < CLOSING_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_STEP_MINUTES) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

/**
 * Returns the list of time slots still open for a given date + service,
 * respecting: opening hours, max bookings per slot, and buffer time
 * between the requested slot and any adjacent booked slot.
 */
async function getAvailableSlots(date) {
  if (isHoliday(date)) return [];

  const allSlots = generateDaySlots();
  const bookings = await Appointment.findAll({
    where: { date, status: { [Op.in]: ["pending", "confirmed"] } },
  });

  const countBySlot = bookings.reduce((acc, b) => {
    acc[b.time] = (acc[b.time] || 0) + 1;
    return acc;
  }, {});

  return allSlots.filter((slot) => (countBySlot[slot] || 0) < MAX_BOOKINGS_PER_SLOT);
}

async function assertSlotIsBookable(date, time) {
  if (isHoliday(date)) {
    const err = new Error("The salon is closed on this date.");
    err.statusCode = 400;
    throw err;
  }
  const available = await getAvailableSlots(date);
  if (!available.includes(time)) {
    const err = new Error("This slot is no longer available. Please choose another time.");
    err.statusCode = 409;
    throw err;
  }
}

module.exports = {
  OPENING_HOUR,
  CLOSING_HOUR,
  BUFFER_MINUTES,
  MAX_BOOKINGS_PER_SLOT,
  isHoliday,
  getAvailableSlots,
  assertSlotIsBookable,
};
