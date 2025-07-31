const express = require("express");

const {
  createUser,
  getAllUsers,
  getUser,
} = require("../controllers/user.controllers.js");
const { isAuthenticated } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

// router.get("/check", isAuthenticated, (req, res) => {
//   console.log("--- in the controller ---");
//   console.log(req.user);

//   res.send("hello user!!!!");
// });

module.exports = router;
