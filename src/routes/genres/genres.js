const express = require("express");
const { Genre, validate } = require("./genreModel");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find({});

  return res.send(genres);
});

router.get("/:genreId", async (req, res) => {
  const id = req.params.genreId;

  const genre = await Genre.findById(id);
  console.log("genere by id: ", id);
  if (genre) {
    res.send(genre);
  } else {
    return res.status(404).send("genre not found");
  }
});

router.post("/", async (req, res) => {
  const genre = req.body;

  const result = validate(genre);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const exits = await Genre.exists(req.body);

  if (exits) return res.status(400).send("genre already exists");

  const newGenre = new Genre(genre);

  const savedGenre = await newGenre.save();

  console.log(savedGenre);

  return res.send(`successfully added ${newGenre.name}`);
});

router.put("/:genreId", async (req, res) => {
  const genre = req.body;

  const valid = validate(genre);
  if (valid.error) return res.status(400).send(valid.error.details[0].message);

  try {
    const editGenre = await Genre.findById(req.params.genreId);
    editGenre.name = genre.name;
    const isEdited = await editGenre.save();
    console.log(isEdited);
    return res.send("successfully updated");
  } catch (err) {
    return res.status(400).send("genre does not exists ");
  }
});

router.delete("/:genreId", async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.genreId);
    return res.send("successfully deleted " + deletedGenre.name);
  } catch (err) {
    return res.status(404).send("genre does not exist");
  }
});

module.exports = router;
