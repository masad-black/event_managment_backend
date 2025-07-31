const app = require("./app.js");

const userRoutes = require("./routers/user.routes.js");
const authRoutes = require("./routers/auth.routes.js");

// * Routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello this is working!!!");
});

// todo: read about the path module
// todo: read about the buffer
// todo: small project for practing the RBAC (chat app)
