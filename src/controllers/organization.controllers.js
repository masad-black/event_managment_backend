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

async function getAllOrganizations(req, res) {
  const organizations = await prisma.organization.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      bannerDetail: true,
      socialLinks: true,
      categories: true,
      createdAt: true,
    },
  });

  return res.json(new Response(200, "Organizations records", organizations));
}

async function updateOrganizationData(req, res) {
  const { name, description } = req.body;

  try {
    return res.send("updated");
  } catch (error) {
    console.log("__Error in updating org record__", error);
    return res.json(new Error(500, error.name));
  }
}

async function createNewOrganization(req, res) {
  const { userId } = req.params;
  const { name, description } = req.body;

  // checking if the given userId is same as the authentic user
  if (userId !== req.user.id) {
    return res.json(new Response(401, "Given user id is not correct"));
  }

  try {
    // const categorieId = await prisma.categorie.findUnique({
    //   where: {
    //     name: categorieName,
    //   },
    // });

    // updating role USER -> SELLER
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "SELLER",
      },
    });

    const organization = await prisma.organization.create({
      data: {
        ownerId: userId,
        name,
        description,
        bannerDetail: {
          publicId: req.image.public_id,
          bannerUrl: req.image.url,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        bannerDetail: true,
        socialLinks: true,
        categories: true,
      },
    });

    res.json(new Response(201, "your organization created", organization));
  } catch (error) {
    console.log(`__Error in creating organization__`, error);
    res.json(new Error(500, error.message));
  }
}

// todo: also delete all the related events/followers etc
async function deleteOrganization(req, res) {
  const { orgId } = req.params;
  try {
    const org = await prisma.organization.delete({
      where: {
        ownerId: req.user.id,
        id: orgId,
      },
    });

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        role: "USER",
      },
    });

    return res.json(new Response(200, "Organization record deleted"));
  } catch (error) {
    console.log("__Error in deleting organization record__", error);
    return res.json(new Error(500, error.name));
  }
}

module.exports = {
  getOrganization,
  updateOrganizationData,
  getAllOrganizations,
  deleteOrganization,
  createNewOrganization,
};
