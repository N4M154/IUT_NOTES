const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: "You do not have access" });
  }
};
module.exports = ensureAuthenticated;
