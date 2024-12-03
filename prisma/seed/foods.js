const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function foods() {
  await prisma.food.upsert({
    where: { name: "Broccoli" },
    update: {},
    create: {
      name: "Broccoli",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Sriracha" },
    update: {},
    create: {
      name: "Sriracha",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Tofu" },
    update: {},
    create: {
      name: "Tofu",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Corn Starch" },
    update: {},
    create: {
      name: "Corn Starch",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Canola Oil" },
    update: {},
    create: {
      name: "Canola Oil",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });
}

module.exports = foods;
