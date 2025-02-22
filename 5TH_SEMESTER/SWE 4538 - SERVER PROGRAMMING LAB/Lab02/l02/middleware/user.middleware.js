const isAuthenticated = (req, res, next) => {
  console.log("middleware");
  next();
};

module.exports = isAuthenticated;
