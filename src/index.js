const express = require("express");
const moviesDatabase = require("./database/movies");
const app = express();
app.use(express.json());
const home = require("./routes/home");
const genres = require("./routes/genres/genres");
const port = 4000;

app.listen(port);

app.use("/api", home);
app.use("/api/genres", genres);

// TODO:Connect to database!

moviesDatabase.Connect();
