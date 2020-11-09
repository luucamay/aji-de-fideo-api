module.exports = function addGatorHeader(req, res, next) {
  res.setHeader("X-Gator-Policy", "chomp-chomp");
  next();
};