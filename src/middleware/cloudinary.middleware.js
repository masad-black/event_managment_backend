const Response = require("../utils/api_response.js");
const Error = require("../utils/api_error.js");
const { prisma } = require("../db/prisma_connect.js");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../libs/cloudinary.js");

function uploadImage(type) {
  return async (req, res, next) => {
    try {
      if (Object.keys(req.file).length === 0) {
        return res.json(new Error(400, "Profile image is required"));
      }

      const cloudinary = await uploadImageToCloudinary(req.file.path, type);

      req.image = cloudinary;
      next();
    } catch (error) {
      console.log("__Upload middleware error__", error);
      return res.json(new Error(500, error.message));
    }
  };
}

async function deleteImage(req, res, next) {
  console.log("__user__", req.user);

  try {
    const userImage = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        profileDetail: true,
      },
    });

    // deleting the old prfile image from cloudinary
    const result = await deleteImageFromCloudinary(
      userImage.profileDetail.publicId
    );

    if (!result) {
      return res.json(new Error(500, "Error in deleting image"));
    }

    next();
  } catch (error) {
    console.log("__Upload middleware error__", error);
    return res.json(new Error(500, error.message));
  }
}

module.exports = {
  uploadImage,
  deleteImage,
};
