const app = require("./app.js");
const mainRouter = require("./routers");

// main route

app.use("/api", mainRouter);

app.get("/", (req, res) => {
  res.send("hello this is working!!!");
});

// todo: read about the buffer
// todo: learn about db connections

// todo: 3 main functionalitis send notification, follows other organizations and buyin tickets stripe
