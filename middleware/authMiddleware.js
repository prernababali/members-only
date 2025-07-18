const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/log-in");
};

const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_admin) return next();
  res.redirect("/");
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
};
