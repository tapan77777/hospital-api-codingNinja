const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Nitish:nitish33@cluster0.ksobj.mongodb.net/test"
);

const db = mongoose.connection;

db.error(
  "error",
  console.error.bind(console, "error in connecting with mongodb")
);

db.once("open", () => {
  console.log("succesfully connecting with mongo db");
});

module.exports = db;
