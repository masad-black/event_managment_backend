const express = require("express");

const {
  getOrganization,
} = require("../controllers/organization.controllers.js");
const {
  isAuthenticated,
  isRoleSeller,
} = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/userId", isAuthenticated, isRoleSeller, getOrganization);

module.exports = router;
