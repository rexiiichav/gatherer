const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const measures = require("./seed/measures");
const foods = require("./seed/foods");
const locations = require("./seed/locations");

//npx prisma db seed
async function seed() {
  await measures()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  await locations()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  await foods()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

seed();
