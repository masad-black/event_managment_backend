const { prisma } = require("../db/prisma_connect.js");
const Response = require("../utils/api_response.js");
const Error = require("../utils/api_error.js");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../libs/cloudinary.js");

async function getUser(req, res) {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    res.json(new Response(200, "User found", user));
  } catch (error) {
    res.json(new Error(500, error.message, error.name));
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(new Response(200, "All users from DB", users));
  } catch (error) {
    res.json(new Error());
  }
}

async function updateUserData(req, res) {
  // these fields are not allowed to be changes in this controller
  for (let key of Object.keys(req.body)) {
    if (key === "role" || key === "email" || key === "password") {
      return res.json(new Response(400, "Some fileds are not allowed"));
    }
  }

  console.log("__data__", req.body);

  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        ...req.body,
      },
    });

    return res.json(new Response(200, "Updated user record", user));
  } catch (error) {
    console.log("__Error in updating user record__", error);
    return res.json(new Error(500, error.message));
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

module.exports = {
  getAllUsers,
  getUser,
  updateUserData,
  createNewOrganization,
};
