const express = require("express");

const {
  registerNewUser,
  signinUser,
  getNewTokens,
  resetPassword,
} = require("../controllers/auth.controllers.js");
const uploads = require("../middleware/multer.middleware.js");
const { uploadImage } = require("../middleware/cloudinary.middleware.js");

const router = express.Router();

router.get("/refresh-token", getNewTokens);

router.post(
  "/register",
  uploads.single("profileImage"),
  uploadImage("USER"),
  registerNewUser
);
router.post("/sign-in", signinUser);
router.post("/reset-password", resetPassword);

// todo
// router.post("/log-out");

module.exports = router;
