const express = require("express");
const { connected, Genre } = require("../database/movies");
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

// console.log("is connected", connected());

setTimeout(() => {
  console.log("is connected after 3 secs", connected());
}, 3000);

const schema = joi.object({
  name: joi.string().min(3).required(),
});

router.get("/", async (req, res) => {
  if (!connected)
    return res.status(400).send("Database might be down, try again later");
  const genres = await Genre.find({});
  // console.log(gs);
  return res.send(genres);
});

router.get("/:genreId", async (req, res) => {
  if (!connected)
    return res.status(400).send("Database might be down, try again later");

  // const id = Number.parseInt(req.params.genreId);
  const id = req.params.genreId;
  // const genre = genres.find((genre) => genre.id === id);
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

  const result = schema.validate(genre);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  //   return res.send(result);

  // const exits = genres.find((value) => value.name === genre.name);

  const exits = await Genre.exists(req.body);

  if (exits) return res.status(400).send("genre already exists");

  // const id = genres[genres.length - 1].id + 1;

  // const newGenre = { id, ...genre };

  // genres.push(newGenre);

  const newGenre = new Genre(genre);

  const savedGenre = await newGenre.save();

  console.log(savedGenre);

  return res.send(`successfully added ${newGenre.name}`);
});

router.put("/:genreId", async (req, res) => {
  const genre = req.body;

  //validate request body structure
  const valid = schema.validate(genre);
  if (valid.error) return res.status(400).send(valid.error.details[0].message);

  //check if genre already exists
  // const exists = genres.find((g) => g.name === genre.name);
  try {
    const editGenre = await Genre.findById(req.params.genreId);
    editGenre.name = genre.name;
    const isEdited = await editGenre.save();
    console.log(isEdited);
    return res.send("successfully updated");
  } catch (err) {
    return res.status(400).send("genre does not exists ");
  }

  res.send("editGenre");
  //grab the genre to edit
  // const editGenre = genres.find(
  //   (g) => g.id === Number.parseInt(req.params.genreId)
  // );
  // if (!editGenre) return res.status(400).send("id does not exist");
  // const prevName = editGenre.name;
  // editGenre.name = genre.name;

  // return res.send(`successfully edited ${prevName} to ${genre.name}`);
});

router.delete("/:genreId", async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.genreId);
    return res.send("successfully deleted " + deletedGenre.name);
  } catch (err) {
    return res.status(404).send("genre does not exist");
  }

  // const genre = genres.find(
  //   (g) => g.id === Number.parseInt(req.params.genreId)
  //   );

  //   if (!genre) return res.status(404).send("genre does not exist");

  //   const newGenres = genres.filter((g) => g.id != genre.id);
  // const index = genres.findIndex((g) => g.id === Number.parseInt(genre.id));

  // genres.splice(index, 1);

  // return res.send(`successfully deleted ${genre.name}`);
});

module.exports = router;
