const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.food_index_get = asyncHandler(async (req, res, next) => {
  const foods = await prisma.food.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  res.status(200).json({ message: "Success", foods: foods });
});

exports.food_show_get = asyncHandler(async (req, res, next) => {
  const food = await prisma.food.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(200).json({ message: "Success", food });
});
