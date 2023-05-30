const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.get("x-auth-token");
  if (!token) return res.status(401).send("Forbiden request");

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded.isAdmin) {
      next();
    } else {
      return res.status(400).send("Only Admins can access this resouce");
    }
  } catch (err) {
    return res.status(400).send("Unautherized user");
  }
};
