const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.get("x-auth-token");

  if (!token) return res.status(401).send("Unotherized User");

  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // err
    return res.status(403).send("Invalid User");
  }
};
