const jwt = require("jsonwebtoken");

const Error = require("../utils/api_error.js");

function isAuthenticated(req, res, next) {
  const { jwt_access_token } = req.cookies;

  // verifying jwt token and stroing user id in req object
  jwt.verify(jwt_access_token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json(new Error(401, err.message, err.name));
    }
    // setting user id
    req.user = {
      id: decoded.userId,
    };

    next();
  });
}

// checking if the requested user role in 'USER', then giving access to resources
function isRoleUser(req, res) {}

// checking if the requested user role in 'SELLER', then giving access to resources
function isRoleSeller(req, res) {}

module.exports = {
  isAuthenticated,
  isRoleUser,
  isRoleSeller,
};
