const app = require("./app.js");

app.get("/", (req, res) => {
  res.send("hello this is working!!!");
});
