const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function locations() {
  await prisma.location.upsert({
    where: { name: "Produce" },
    update: {},
    create: {
      name: "Produce",
    },
  });

  await prisma.location.upsert({
    where: { name: "Refrigerator" },
    update: {},
    create: {
      name: "Refrigerator",
    },
  });

  await prisma.location.upsert({
    where: { name: "Freezer" },
    update: {},
    create: {
      name: "Freezer",
    },
  });

  await prisma.location.upsert({
    where: { name: "Bakery" },
    update: {},
    create: {
      name: "Bakery",
    },
  });

  await prisma.location.upsert({
    where: { name: "Spice" },
    update: {},
    create: {
      name: "Spice",
    },
  });

  await prisma.location.upsert({
    where: { name: "Aisles" },
    update: {},
    create: {
      name: "Aisles",
    },
  });
}

module.exports = locations;
