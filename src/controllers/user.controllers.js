const Response = require("../utils/api_response.js");
const Error = require("../utils/api_error.js");

async function createUser(req, res) {
  const data = req.body;
  console.log("---------------");
  console.log(req.headers);
  //   const userAddress = {
  //     mainAddress: data.address.mainAddress,
  //     country: data.address.country,
  //     city: data.address.city,
  //     postalCode: data.address.postalCode,
  //   };

  try {
    //     await prisma.user.create({
    //       data: {
    //         firstName: data.firstName,
    //         lastName: data.lastName,
    //         email: data.email,
    //         password: data.password,
    //         phoneNumber: data.phoneNumber,
    //         address: userAddress,
    //       },
    // });
    return res.json(new Response(200, "data"));
  } catch (error) {
    res.json(new Error());
  }
}

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

module.exports = {
  createUser,
  getAllUsers,
  getUser,
};
