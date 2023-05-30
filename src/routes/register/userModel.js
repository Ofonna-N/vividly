const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },
  isAdmin: {
    type: Boolean,
  },
});

userSchema.methods.getToken = function () {
  const token = jwt.sign(
    { name: this.name, email: this.email, isAdmin: this.isAdmin },
    process.env.TOKEN_SECRET
  );
  return token;
};

const userModel = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

module.exports.validate = validateUser;

module.exports.User = userModel;
