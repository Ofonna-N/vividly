const express = require("express");
const app = express();
app.use(express.json());
const home = require("./routes/home");
const genres = require("./routes/genres");
const port = 4000;

app.listen(port);

app.use("/api", home);
app.use("/api/genres", genres);
