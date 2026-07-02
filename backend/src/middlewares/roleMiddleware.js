/** Restricts a route to a specific role, e.g. ownerOnly */
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: `Only ${role} accounts can access this resource` });
    }
    next();
  };
}

module.exports = { requireRole };
