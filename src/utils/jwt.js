const jwt = require("jsonwebtoken");

require("dotenv").config();

function genAccessToken(payload, type) {
  if (type === "ATK") {
    // get new access token
    return jwt.sign({ userId: payload }, process.env.JWT_SECRET, {
      expiresIn: "1d", //expires in 2min
    });
  } else if (type === "RTK") {
    // new refresh token
    return jwt.sign({ userId: payload }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1d", //expires in 1day
    });
  }
}

module.exports = {
  genAccessToken,
};
