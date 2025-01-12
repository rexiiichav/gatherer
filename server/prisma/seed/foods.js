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

  await prisma.food.upsert({
    where: { name: "Hemp Seeds" },
    update: {},
    create: {
      name: "Hemp Seeds",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Walnuts" },
    update: {},
    create: {
      name: "Walnuts",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Nutritional Yeast" },
    update: {},
    create: {
      name: "Nutritional Yeast",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Oregano" },
    update: {},
    create: {
      name: "Oregano",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Paprika" },
    update: {},
    create: {
      name: "Paprika",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Garlic Powder" },
    update: {},
    create: {
      name: "Garlic Powder",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Onion Powder" },
    update: {},
    create: {
      name: "Onion Powder",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Cumin" },
    update: {},
    create: {
      name: "Cumin",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Chili Powder" },
    update: {},
    create: {
      name: "Chili Powder",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Cayenne Pepper" },
    update: {},
    create: {
      name: "Cayenne Pepper",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Soy Sauce" },
    update: {},
    create: {
      name: "Soy Sauce",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Black Pepper" },
    update: {},
    create: {
      name: "Black Pepper",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Salt" },
    update: {},
    create: {
      name: "Salt",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Tomato Paste" },
    update: {},
    create: {
      name: "Tomato Paste",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Olive Oil" },
    update: {},
    create: {
      name: "Olive Oil",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Yellow Onion" },
    update: {},
    create: {
      name: "Yellow Onion",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Avocado" },
    update: {},
    create: {
      name: "Avocado",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Salsa" },
    update: {},
    create: {
      name: "Salsa",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Cilantro" },
    update: {},
    create: {
      name: "Cilantro",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Lime" },
    update: {},
    create: {
      name: "Lime",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Rice" },
    update: {},
    create: {
      name: "Rice",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Pinto Beans" },
    update: {},
    create: {
      name: "Pinto Beans",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Red Bell Pepper" },
    update: {},
    create: {
      name: "Red Bell Pepper",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Jalapeno" },
    update: {},
    create: {
      name: "Jalapeno",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Vegetable Broth" },
    update: {},
    create: {
      name: "Vegetable Broth",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Crushed Fire Roasted Tomatoes" },
    update: {},
    create: {
      name: "Crushed Fire Roasted Tomatoes",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Carrots" },
    update: {},
    create: {
      name: "Carrots",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Celery Stalks" },
    update: {},
    create: {
      name: "Celery Stalks",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Yukon Gold Potatoes" },
    update: {},
    create: {
      name: "Yukon Gold Potatoes",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Green Lentils" },
    update: {},
    create: {
      name: "Green Lentils",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Italian Seasoning" },
    update: {},
    create: {
      name: "Italian Seasoning",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Lemon" },
    update: {},
    create: {
      name: "Lemon",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Produce" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Red Lentils" },
    update: {},
    create: {
      name: "Red Lentils",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Red Curry Paste" },
    update: {},
    create: {
      name: "Red Curry Paste",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Garam Masala" },
    update: {},
    create: {
      name: "Garam Masala",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Curry Powder" },
    update: {},
    create: {
      name: "Curry Powder",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Turmeric" },
    update: {},
    create: {
      name: "Turmeric",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Ginger Powder" },
    update: {},
    create: {
      name: "Ginger Powder",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Tomato Puree" },
    update: {},
    create: {
      name: "Tomato Puree",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Coconut Milk" },
    update: {},
    create: {
      name: "Coconut Milk",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Vegan Butter" },
    update: {},
    create: {
      name: "Vegan Butter",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Refrigerator" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Soy Milk" },
    update: {},
    create: {
      name: "Soy Milk",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Refrigerator" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Cocoa Powder" },
    update: {},
    create: {
      name: "Cocoa Powder",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Chocolate Chips" },
    update: {},
    create: {
      name: "Chocolate Chips",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Sugar" },
    update: {},
    create: {
      name: "Sugar",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Peppermint Extract" },
    update: {},
    create: {
      name: "Peppermint Extract",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "All Purpose Flour" },
    update: {},
    create: {
      name: "All Purpose Flour",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Baking Powder" },
    update: {},
    create: {
      name: "Baking Powder",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Baking Soda" },
    update: {},
    create: {
      name: "Baking Soda",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Cinnamon" },
    update: {},
    create: {
      name: "Cinnamon",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Spice" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Vanilla Extract" },
    update: {},
    create: {
      name: "Vanilla Extract",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Apple Cider Vinegar" },
    update: {},
    create: {
      name: "Apple Cider Vinegar",
      locationId: (
        await prisma.location.findUnique({
          where: { name: "Aisles" },
        })
      ).id,
    },
  });
}

module.exports = foods;