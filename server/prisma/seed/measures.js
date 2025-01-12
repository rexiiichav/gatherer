const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function measures() {
  await prisma.measure.upsert({
    where: { name: "Teaspoon(s)" },
    update: {},
    create: {
      name: "Teaspoon(s)",
      aggregateByVolume: true,
      conversion: 1 / 768,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Tablespoon(s)" },
    update: {},
    create: {
      name: "Tablespoon(s)",
      aggregateByVolume: true,
      conversion: 1 / 256,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Cup(s)" },
    update: {},
    create: {
      name: "Cup(s)",
      aggregateByVolume: true,
      conversion: 1 / 16,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Fluid Ounce(s)" },
    update: {},
    create: {
      name: "Fluid Ounce(s)",
      aggregateByVolume: true,
      conversion: 1 / 128,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Quart(s)" },
    update: {},
    create: {
      name: "Quart(s)",
      aggregateByVolume: true,
      conversion: 1 / 4,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Gallon(s)" },
    update: {},
    create: {
      name: "Gallon(s)",
      aggregateByVolume: true,
      conversion: 1,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Gram(s)" },
    update: {},
    create: {
      name: "Gram(s)",
      aggregateByWeight: true,
      conversion: 1 / 453.592,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Pound(s)" },
    update: {},
    create: {
      name: "Pound(s)",
      aggregateByWeight: true,
      conversion: 1,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Can(s)" },
    update: {},
    create: {
      name: "Can(s)",
      conversion: 1,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Item(s)" },
    update: {},
    create: {
      name: "Item(s)",
      conversion: 1,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Package(s)" },
    update: {},
    create: {
      name: "Package(s)",
      conversion: 1,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Fruit(s)" },
    update: {},
    create: {
      name: "Fruit(s)",
      conversion: 1,
    },
  });

  await prisma.measure.upsert({
    where: { name: "Vegetable(s)" },
    update: {},
    create: {
      name: "Vegetable(s)",
      conversion: 1,
    },
  });
}

module.exports = measures;
