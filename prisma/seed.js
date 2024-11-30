const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const measures = require("./seed/measures");
const foods = require("./seed/foods");

//npx prisma db seed

measures()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

foods()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
