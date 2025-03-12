const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.measure_index_get = asyncHandler(async (req, res, next) => {
  const measures = await prisma.measure.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  res.status(200).json({ message: "Success", measures: measures });
});

exports.measure_show_get = asyncHandler(async (req, res, next) => {
  const measure = await prisma.measure.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(200).json({ message: "Success", measure });
});
