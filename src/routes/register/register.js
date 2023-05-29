const express = require("express");
const router = express.Router();
const { User, validate } = require("./userModel");
var _ = require("lodash");
const bcrypt = require("bcrypt");
// const saltRounds = 10;

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const exists = await User.exists({ email: req.body.email });
  //   console.log(exists);
  if (exists) return res.status(400).send("user already exists");

  const user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  const newUser = await user.save();

  return res.send(_.pick(newUser, ["name", "email"]));
});

module.exports = router;
