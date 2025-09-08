const express = require("express");

const {
  getEventTickets,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controllers.js");

const router = express.Router();

router.get("/:eventId/tickets", getEventTickets);

router.put("/:eventId", updateEvent);

router.delete("/:eventId", deleteEvent);

module.exports = router;
