const express = require("express");

const {
  loginNewUser,
  signinUser,
  getNewTokens,
  resetPassword,
} = require("../controllers/auth.controllers.js");
const uploadType = require("../middleware/multer.middleware.js");

const router = express.Router();

router.get("/refresh-token", getNewTokens);

router.post("/log-in", uploadType.single, loginNewUser);
router.post("/sign-in", signinUser);
router.post("/reset-password", resetPassword);

module.exports = router;
