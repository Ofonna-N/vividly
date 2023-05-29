const mongoose = require("mongoose");
const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const GenreModel = mongoose.model("Genre", genreSchema);

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

function validate(genre) {
  return joiSchema.validate(genre);
}
module.exports.genreSchema = genreSchema;
module.exports.Genre = GenreModel;
module.exports.validate = validate;
