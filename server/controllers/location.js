const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.location_index_get = asyncHandler(async (req, res, next) => {
  const locations = await prisma.location.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  res.status(200).json({ message: "Success", locations });
});

exports.location_show_get = asyncHandler(async (req, res, next) => {
  const location = await prisma.location.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(200).json({ message: "Success", location });
});
