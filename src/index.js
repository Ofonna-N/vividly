const express = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
//databases
const vividlyDatabase = require("./database/vividly"); //database
//app
const app = express();
app.use(express.json());
//routes
const home = require("./routes/home");
const genres = require("./routes/genres/genres");
const movies = require("./routes/movies/movies");
const register = require("./routes/register/register");
const auth = require("./routes/auth/auth");
const port = 4000;

app.listen(port);

app.use("/api", home);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/register", register);
app.use("/api/auth", auth);
// TODO:Connect to database!

vividlyDatabase.Connect();
