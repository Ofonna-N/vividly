const express = require("express");
const router = express.Router();
const { validate } = require("./authModel");
const { User } = require("./../register/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).send("Invalid Email or Password");

  const passwordValid = await bcrypt.compare(req.body.password, user.password);

  if (!passwordValid) return res.status(400).send("Invalid Email or Password");

  return res.send("Logging in...");
});

module.exports = router;
