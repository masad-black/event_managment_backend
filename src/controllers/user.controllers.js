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

  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        ...req.body,
        profileDetail: {
          publicId: req.image.public_id,
          url: req.image.url,
        },
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
  const { path } = req.file;

  // checking if the given userId is same as the authentic user
  // if (userId !== req.user.id) {
  //   return res.json(new Response(401, "give user id is not authneticated"));
  // }

  try {
    // updating role USER -> SELLER
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "SELLER",
      },
    });

    // uploading banner image to cloudinary
    let response;
    if (path) {
      response = await uploadImageToCloudinary(path, "ORGANIZATION");
    }

    const organization = await prisma.organization.create({
      data: {
        name,
        description,
        bannerDetail: {
          publicId: response.public_id,
          bannerUrl: response.url,
        },
        ownerId: userId,
      },
    });

    res.json(new Response(201, "your organization created", organization));
  } catch (error) {
    console.log(`Error in creating organization`);
    console.log(error);
    res.json(new Error());
  }
}

module.exports = {
  getAllUsers,
  getUser,
  updateUserData,
  createNewOrganization,
};
