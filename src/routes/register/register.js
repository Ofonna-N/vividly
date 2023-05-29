const express = require("express");
const router = express.Router();
const { User, validate } = require("./userModel");
var _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const exists = await User.exists({ email: req.body.email });
  //   console.log(exists);
  if (exists) return res.status(400).send("user already exists");

  const user = new User(req.body);

  const newUser = await user.save();

  return res.send(_.pick(newUser, ["name", "email"]));
});

module.exports = router;
