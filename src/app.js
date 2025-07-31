const express = require("express");
const cookiesParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// * Middlewars

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// for cookies parsing
app.use(cookiesParser());

app.listen(process.env.PORT, () => {
  console.log(`server running on port - ${process.env.PORT}`);
});

module.exports = app;
