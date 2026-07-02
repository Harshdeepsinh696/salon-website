const { isHoliday } = require("./slotAvailabilityService");

function getHolidays() {
  // In a real system this would come from a `holidays` table managed by the owner.
  return ["2026-08-15", "2026-10-02"];
}

module.exports = { getHolidays, isHoliday };
