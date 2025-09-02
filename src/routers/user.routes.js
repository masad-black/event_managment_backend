const express = require("express");

const {
  getAllUsers,
  getUser,
  createNewOrganization,
  updateUserData,
} = require("../controllers/user.controllers.js");
const uploads = require("../middleware/multer.middleware.js");
const {
  uploadImage,
  deleteImage,
} = require("../middleware/cloudinary.middleware.js");

const router = express.Router();

// user
router.get("/", getAllUsers);
router.get("/:userId", getUser);

router.put(
  "/",
  uploads.single("profileImage"),
  uploadImage("USER"),
  deleteImage,
  updateUserData
);

// organization
router.post(
  "/organizations",
  uploads.single("bannerImage"),
  createNewOrganization
);

module.exports = router;
