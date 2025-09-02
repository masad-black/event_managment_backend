const express = require("express");

const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");
const organizationRoutes = require("./organization.routes.js");
const { isAuthenticated } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.use("/users", isAuthenticated, userRoutes);
router.use("/auth", authRoutes);
router.use("/organizations", isAuthenticated, organizationRoutes);

module.exports = router;
