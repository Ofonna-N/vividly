const mongoose = require("mongoose");
const { genreSchema } = require("./../genres/genreModel");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

const joiSchema = Joi.object({
  title: Joi.string().min(4).required(),
  genreId: Joi.objectId().required(),
  numberInStock: Joi.number().min(0).required(),
  dailyRentalRate: Joi.number().min(0).required(),
});

function validateMovie(movie) {
  return joiSchema.validate(movie);
}

module.exports.validate = validateMovie;

module.exports.Movie = Movie;
