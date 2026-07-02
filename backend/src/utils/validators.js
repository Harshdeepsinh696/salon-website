function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}

function isNonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

module.exports = { isEmail, isNonEmpty };
