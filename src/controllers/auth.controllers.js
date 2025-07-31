const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { prisma } = require("../db/prisma.connect.js");
const Response = require("../utils/api_response.js");
const uploadImageToCloudinary = require("../libs/cloudinary.js");
const { genAccessToken } = require("../utils/jwt.js");

// creating a new record in the DB
async function loginNewUser(req, res) {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const { path } = req.file;

  if (password.lenght < 8) {
    return res.json(400, "passowrd length is must be >= 8");
  }

  try {
    // hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // uploading prfile image to cloud
    let response;
    if (path) {
      response = await uploadImageToCloudinary(path);
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPassword,
        phoneNumber,
        profileDetail: {
          publicId: response.public_id,
          imageUrl: response.url,
        },
      },
    });

    // jwt tokens
    const accessToken = genAccessToken(decoded.userId, (type = "ATK"));
    const refreshToken = genAccessToken(decoded.userId, (type = "RTK"));

    return res
      .cookie("jwt_access_token", accessToken)
      .cookie("jwt_refresh_token", refreshToken)
      .json(new Response(200, "User created", newUser));
  } catch (error) {
    res.json(new Error());
  }
}

// letting the user sign-in with email and password
async function signinUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // comparing the password
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.json(new Response(401, "incorrect password"));
    }

    const accessToken = genAccessToken(user.id, (type = "ATK"));
    const refreshToken = genAccessToken(user.id, (type = "RTK"));

    res
      .cookie("jwt_access_token", accessToken)
      .cookie("jwt_refresh_token", refreshToken)
      .json(new Response(200, "user sign-in", user));
  } catch (error) {
    res.json(new Error());
  }
}

// generating new access and refresh token, when the previous access token expires
async function getNewTokens(req, res) {
  const { jwt_access_token, jwt_refresh_token } = req.cookies;

  jwt.verify(jwt_refresh_token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
    // refresh_token is expired or this is not that token
    if (err) {
      return res.json(new Error(401, err.message, err.name));
    }

    //if access_token expires only then the new access and refresh token should be generated
    jwt.verify(jwt_access_token, process.env.JWT_SECRET, (err) => {
      if (err) {
        const accessToken = genAccessToken(decoded.userId, (type = "ATK"));
        const refreshToken = genAccessToken(decoded.userId, (type = "RTK"));

        return res
          .cookie("jwt_access_token", accessToken)
          .cookie("jwt_refresh_token", refreshToken)
          .json(new Response(200, "new access and refresh token"));
      }
      // else not expired
      return res.json(new Response(200, "access token is valid"));
    });
  });
}

// setting new passowrd, if the user forget the current password
async function resetPassword(req, res) {
  const { email, password, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // comparing the password
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.json(new Response(401, "incorrect password"));
    }

    const newHashPassword = await bcrypt.hash(newPassword, 10);

    // setting the new password for user
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: newHashPassword,
      },
    });

    return res.json(new Response(200, "new password updated"));
  } catch (error) {
    res.json(new Error());
  }
}

module.exports = {
  loginNewUser,
  signinUser,
  getNewTokens,
  resetPassword,
};
