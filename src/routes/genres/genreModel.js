const mongoose = require("mongoose");
const joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const GenreModel = mongoose.model("Genre", genreSchema);

const joiSchema = joi.object({
  name: joi.string().min(3).required(),
});

function validate(genre) {
  return joiSchema.validate(genre);
}

module.exports.Genre = GenreModel;
module.exports.validate = validate;
