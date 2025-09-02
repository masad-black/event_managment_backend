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

const router = express.Router();

router.get("/userId", isAuthenticated, isRoleSeller, getOrganization);
router.get("/", getAllOrganizations);

router.patch("/:orgId", updateOrganizationData);

router.delete("/:orgId", deleteOrganization);

module.exports = router;
