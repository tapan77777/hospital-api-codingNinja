const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportStratergy = require("./config/passport");
const db = require("./config/database");
const router = require("./routes/router");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`server is giving an error: ${err}`);
  } else {
    console.log("server is succesfully up and running");
  }
});
