const mongoose = require("mongoose");

let connected = false;

mongoose
  .connect("mongodb://127.0.0.1:27017/movies")
  .then(() => {
    console.log("connected to mogodb");
    connected = true;
  })
  .catch((err) => {
    console.log("failed to connect: ", err.message);
    connected = false;
  });

const genreSchema = new mongoose.Schema({
  name: String,
});

const Genre = mongoose.model("Genre", genreSchema);

// async function createCourse() {
//   const courseSchema = new mongoose.Schema({
//     name: String,
//   });
//   const Genre = mongoose.model("Genre", courseSchema);
//   // const comedy = await new Genre({name:"comedy"});
//   const genres = await Genre.find();
//   console.log(genres);
// }

// createCourse();

module.exports.connected = () => mongoose.connection.readyState === 1;
module.exports.Genre = Genre;
