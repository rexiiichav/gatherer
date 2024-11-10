const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function measures() {
  await prisma.measure.upsert({
    where: { name: "Teaspoon(s)" },
    update: {},
    create: {
      name: "Teaspoon(s)",
    },
  });

  await prisma.measure.upsert({
    where: { name: "Tablespoon(s)" },
    update: {},
    create: {
      name: "Tablespoon(s)",
    },
  });

  await prisma.measure.upsert({
    where: { name: "Cup(s)" },
    update: {},
    create: {
      name: "Cup(s)",
    },
  });

  await prisma.measure.upsert({
    where: { name: "Ounce(s)" },
    update: {},
    create: {
      name: "Ounce(s)",
    },
  });

  await prisma.measure.upsert({
    where: { name: "Gram(s)" },
    update: {},
    create: {
      name: "Gram(s)",
    },
  });

  await prisma.measure.upsert({
    where: { name: "Can(s)" },
    update: {},
    create: {
      name: "Can(s)",
    },
  });

  await prisma.measure.upsert({
    where: { name: "Item(s)" },
    update: {},
    create: {
      name: "Item(s)",
    },
  });

  await prisma.measure.upsert({
    where: { name: "Package(s)" },
    update: {},
    create: {
      name: "Package(s)",
    },
  });

  await prisma.measure.upsert({
    where: { name: "Pound(s)" },
    update: {},
    create: {
      name: "Pound(s)",
    },
  });

  await prisma.measure.upsert({
    where: { name: "Fruit(s)" },
    update: {},
    create: {
      name: "Fruit(s)",
    },
  });

  await prisma.measure.upsert({
    where: { name: "Vegetable(s)" },
    update: {},
    create: {
      name: "Vegetable(s)",
    },
  });
}

module.exports = measures;
