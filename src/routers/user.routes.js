const express = require("express");

const {
  getAllUsers,
  getUser,
  updateUserData,
} = require("../controllers/user.controllers.js");
const {
  createNewOrganization,
} = require("../controllers/organization.controllers.js");
const uploads = require("../middleware/multer.middleware.js");
const { uploadImage } = require("../middleware/cloudinary.middleware.js");

const router = express.Router();

// user
router.get("/", getAllUsers);
router.get("/:userId", getUser);

router.put("/", updateUserData);

// organization
router.post(
  "/:userId/organizations",
  uploads.single("bannerImage"),
  uploadImage("ORGANIZATION"),
  createNewOrganization
);

module.exports = router;
