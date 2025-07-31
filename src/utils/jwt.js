const jwt = require("jsonwebtoken");

function genAccessToken(payload, type) {
  if (type === "ATK") {
    // get new access token
    return jwt.sign({ userId: payload }, process.env.JWT_SECRET, {
      expiresIn: "120000", //expires in 2min
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
