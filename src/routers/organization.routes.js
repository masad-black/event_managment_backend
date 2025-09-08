const express = require("express");

const {
  getOrganization,
  updateOrganizationData,
  getAllOrganizations,
  deleteOrganization,
} = require("../controllers/organization.controllers.js");
const {
  isAuthenticated,
  isRoleSeller,
} = require("../middleware/auth.middleware.js");
const {
  createNewEvent,
  getOrganizationEvents,
} = require("../controllers/event.controllers.js");
const { uploadImage } = require("../middleware/cloudinary.middleware.js");
const multerUpload = require("../middleware/multer.middleware.js");

const router = express.Router();

router.get("/userId", isAuthenticated, isRoleSeller, getOrganization);
router.get("/", getAllOrganizations);

// todo: this route is todo
router.patch("/:orgId", updateOrganizationData);

router.delete("/:orgId", deleteOrganization);

// evnets

// todo: upload image
router.get("/:orgId/events", getOrganizationEvents);

router.post("/:orgId/events", createNewEvent);

module.exports = router;
