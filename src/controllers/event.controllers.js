const Error = require("../utils/api_error.js");
const Response = require("../utils/api_response.js");
const { prisma } = require("../db/prisma_connect.js");

async function createNewEvent(req, res) {
  const { orgId } = req.params;

  const { title, summary, status, startDate, endDate, location } =
    req.body.event;
  const {
    type,
    availableQty,
    perTicketPrice,
    salesStart,
    salesEnd,
    paymentMethod,
    discount,
  } = req.body.ticket;

  try {
    // is the organization exist
    const org = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    });

    if (org === null) {
      return res.json(new Response(400, "Organization doesn't exist"));
    }

    const event = await prisma.event.create({
      data: {
        title,
        summary,
        status,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        organizationId: org.id,
      },
    });

    const ticket = await prisma.ticket.create({
      data: {
        type,
        availableQty,
        perTicketPrice,
        salesStart: new Date(salesStart),
        salesEnd: new Date(salesEnd),
        paymentMethod,
        discount,
        eventId: event.id,
      },
    });

    return res.json(new Response(200, "Event record created", event));
  } catch (error) {
    console.log("__Error in creating event record__", error);
    return res.json(new Error(500, error.name));
  }
}

async function getOrganizationEvents(req, res) {
  const { orgId } = req.params;
  try {
    // is the organization exist
    const org = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    });

    if (org === null) {
      return res.json(new Response(400, "Organization doesn't exist"));
    }

    const events = await prisma.event.findMany({
      where: {
        organizationId: org.id,
      },
      select: {
        id: true,
        status: true,
        title: true,
        summary: true,
        startDate: true,
        endDate: true,
        location: true,
        createdAt: true,
        coverImages: true,
      },
    });

    return res.json(new Response(200, "Organization events", events));
  } catch (error) {
    console.log("__Error in organization events record__", error);
    return res.json(new Error(500, error.name));
  }
}

async function getEventTickets(req, res) {
  const { eventId } = req.params;

  try {
    // is the organization exist
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (event === null) {
      return res.json(new Response(400, "Event doesn't exist"));
    }

    const events = await prisma.ticket.findMany({
      where: {
        eventId: event.id,
      },
    });

    return res.json(new Response(200, "Organization events", events));
  } catch (error) {
    console.log("__Error in organization events record__", error);
    return res.json(new Error(500, error.name));
  }
}

async function updateEvent(req, res) {
  const { eventId } = req.params;
  let nonChangeableFields = [
    "id",
    "organizationId",
    "coverImages",
    "coverVideos",
  ];

  // removing fields that are not allowed to be changed
  let newData = {};
  for (let [key, val] of Object.entries(req.body)) {
    if (!nonChangeableFields.includes(key)) {
      newData[key] = val;
    }
  }

  try {
    const event = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...newData,
      },
    });

    return res.json(new Response(200, "Event record updated", event));
  } catch (error) {
    console.log("__Error in updating event record__", error);
    return res.json(new Error(500, error.name));
  }
}

// todo: also delete the related tickets
async function deleteEvent(req, res) {
  const { eventId } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (event === null) {
      return res.json(new Response(400, "No event record"));
    }

    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    return res.json(new Response(200, "Event record deleted"));
  } catch (error) {
    console.log("__Error in deleting event record__", error);
    return res.json(new Error(500, error.name));
  }
}

module.exports = {
  createNewEvent,
  getOrganizationEvents,
  getEventTickets,
  updateEvent,
  deleteEvent,
};
