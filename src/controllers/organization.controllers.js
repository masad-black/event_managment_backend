const { prisma } = require("../db/prisma_connect.js");
const Response = require("../utils/api_response.js");
const Error = require("../utils/api_error.js");

async function getOrganization(req, res) {
  const { userId } = req.params;

  try {
    const organization = prisma.organization.findUnique({
      where: {
        ownerId: userId,
      },
    });

    if (!organization) {
      return res.json(new Response(400, "give owner id is not corrent"));
    }
  } catch (error) {
    console.log(`Error while getting organization data`);
    console.log(error);
    res.json(new Error());
  }
}

module.exports = {
  getOrganization,
};
