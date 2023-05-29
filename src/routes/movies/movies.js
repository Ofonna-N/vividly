const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Movie, validate } = require("./movieModel");
const { Genre } = require("./../genres/genreModel");

router.get("/", async (req, res) => {
  const movies = await Movie.find({});

  return res.send(movies);
});

router.get("/:movieId", async (req, res) => {
  const id = req.params.movieId;

  try {
    const movie = await Movie.findById(id);
    console.log("movie by id: ", id);
    return res.send(movie);
  } catch (err) {
    console.log(err.message);
    return res.status(404).send("movie not found");
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);

  if (!genre)
    return res
      .status(400)
      .send("Genre doesnt exist, need valid genre to create movie");

  const movie = {
    title: req.body.title,
    genre: {
      _id: genre.id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  };
  //   return res.send("Posted new Movie" + movie);
  const exits = await Movie.exists({ title: movie.title });

  if (exits) return res.status(400).send("movie already exists");

  const newMovie = await new Movie(movie).save();

  return res.send(`successfully added ${newMovie.title}`);
});

router.put("/:movieId", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const idValid = mongoose.Types.ObjectId.isValid(req.params.movieId);

  if (!idValid) return res.status(400).send("movie ID is invalid");

  const movie = await Movie.findById(req.params.movieId);

  if (!movie) return res.status(404).send("Movie does not exist");

  const genre = await Genre.findById(req.body.genreId);

  if (!genre) return res.status(400).send("movie genre does not exist");

  const updatedMovie = await movie.updateOne({
    _id: movie.id,
    genre: genre,
    ...req.body,
  });
  if (!updatedMovie) return res.status(400).send("couldnt update movie");

  return res.send("edit " + updatedMovie);
});

router.delete("/:movieId", async (req, res) => {
  const idValid = mongoose.Types.ObjectId.isValid(req.params.movieId);

  if (!idValid) return res.status(400).send("Invalid Id");

  const deletedMovie = await Movie.findByIdAndDelete(req.params.genreId);
  if (!deletedMovie) return res.status(404).send("genre does not exist");

  return res.send("successfully deleted " + deletedMovie.name);
  // try {
  // } catch (err) {
  //   return res.status(404).send("genre does not exist");
  // }
});

module.exports = router;
