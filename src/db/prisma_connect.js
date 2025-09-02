const { PrismaClient } = require("../../generated/prisma");
const { withAccelerate } = require("@prisma/extension-accelerate");

// creating prisma client
const prisma = new PrismaClient().$extends(withAccelerate());

module.exports = { prisma };
