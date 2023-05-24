const express = require("express");
const router = express.Router();
const joi = require("joi");

const genres = [
  {
    id: 1,
    name: "comedy",
  },
  {
    id: 2,
    name: "romance",
  },
  {
    id: 3,
    name: "action",
  },
];

const schema = joi.object({
  name: joi.string().min(3).required(),
});

router.get("/", (req, res) => {
  return res.send(genres);
});

router.get("/:genreId", (req, res) => {
  const id = Number.parseInt(req.params.genreId);
  const genre = genres.find((genre) => genre.id === id);

  if (genre) {
    res.send(genre);
  } else {
    return res.status(404).send("genre not found");
  }
});

router.post("/", (req, res) => {
  const genre = req.body;

  const result = schema.validate(genre);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  //   return res.send(result);

  const exits = genres.find((value) => value.name === genre.name);

  if (exits) return res.status(400).send("genre already exists");

  const id = genres[genres.length - 1].id + 1;

  const newGenre = { id, ...genre };

  genres.push(newGenre);

  return res.send(`successfully added ${newGenre.name}`);
});

router.put("/:genreId", (req, res) => {
  const genre = req.body;

  //validate request body structure
  const valid = schema.validate(genre);
  if (valid.error) return res.status(400).send(valid.error.details[0].message);

  //check if genre already exists
  const exists = genres.find((g) => g.name === genre.name);
  if (exists) return res.status(400).send("genre already exists");

  //grab the genre to edit
  const editGenre = genres.find(
    (g) => g.id === Number.parseInt(req.params.genreId)
  );
  if (!editGenre) return res.status(400).send("id does not exist");
  const prevName = editGenre.name;
  editGenre.name = genre.name;

  return res.send(`successfully edited ${prevName} to ${genre.name}`);
});

router.delete("/:genreId", (req, res) => {
  const genre = genres.find(
    (g) => g.id === Number.parseInt(req.params.genreId)
  );

  if (!genre) return res.status(404).send("genre does not exist");

  //   const newGenres = genres.filter((g) => g.id != genre.id);
  const index = genres.findIndex((g) => g.id === Number.parseInt(genre.id));

  genres.splice(index, 1);

  return res.send(`successfully deleted ${genre.name}`);
});

module.exports = router;
