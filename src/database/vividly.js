const mongoose = require("mongoose");

async function Connect() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/vividly")
    .then(() => {
      console.log("connected to mogodb");
      connected = true;
    })
    .catch((err) => {
      console.log("failed to connect: ", err.message);
      connected = false;
    });
}

module.exports.Connect = Connect;
