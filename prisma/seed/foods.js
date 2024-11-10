const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function foods() {
  await prisma.food.upsert({
    where: { name: "Broccoli" },
    update: {},
    create: {
      name: "Broccoli",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Spinach" },
    update: {},
    create: {
      name: "Spinach",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });
}

module.exports = foods;
