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
    where: { name: "Hemp Seeds" },
    update: {},
    create: {
      name: "Hemp Seeds",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Corn Starch" },
    update: {},
    create: {
      name: "Corn Starch",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Sriracha" },
    update: {},
    create: {
      name: "Sriracha",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Orange" },
    update: {},
    create: {
      name: "Orange",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Fruit(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Apple" },
    update: {},
    create: {
      name: "Apple",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Fruit(s)" },
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

  await prisma.food.upsert({
    where: { name: "Tofu" },
    update: {},
    create: {
      name: "Tofu",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Soy Milk" },
    update: {},
    create: {
      name: "Soy Milk",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Siggis Yogurt" },
    update: {},
    create: {
      name: "Siggis Yogurt",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Seeduction Bread" },
    update: {},
    create: {
      name: "Seeduction Bread",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Granola" },
    update: {},
    create: {
      name: "Granola",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "White Rice" },
    update: {},
    create: {
      name: "White Rice",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Pretzels" },
    update: {},
    create: {
      name: "Pretzels",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Peanut Butter" },
    update: {},
    create: {
      name: "Peanut Butter",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Chocolate" },
    update: {},
    create: {
      name: "Chocolate",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Canola Oil" },
    update: {},
    create: {
      name: "Canola Oil",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Soy Sauce" },
    update: {},
    create: {
      name: "Soy Sauce",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Popcorn" },
    update: {},
    create: {
      name: "Popcorn",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Chips" },
    update: {},
    create: {
      name: "Chips",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Cheddalicious Crackers" },
    update: {},
    create: {
      name: "Cheddalicious Crackers",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Orange Juice" },
    update: {},
    create: {
      name: "Orange Juice",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Raspberry Lemonade" },
    update: {},
    create: {
      name: "Raspberry Lemonade",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Lemonade" },
    update: {},
    create: {
      name: "Lemonade",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Frozen Strawberries and Bananas" },
    update: {},
    create: {
      name: "Frozen Strawberries and Bananas",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Baby Carrots" },
    update: {},
    create: {
      name: "Baby Carrots",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Package(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Frozen Shelled Edamame" },
    update: {},
    create: {
      name: "Frozen Shelled Edamame",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Pound(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Tahini" },
    update: {},
    create: {
      name: "Tahini",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Tablespoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Lime" },
    update: {},
    create: {
      name: "Lime",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Fruit(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Garlic Sesame Crunch Seasoning" },
    update: {},
    create: {
      name: "Garlic Sesame Crunch Seasoning",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Tablespoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Toasted Sesame Oil" },
    update: {},
    create: {
      name: "Toasted Sesame Oil",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Tablespoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Scallions" },
    update: {},
    create: {
      name: "Scallions",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Item(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Garlic Powder" },
    update: {},
    create: {
      name: "Garlic Powder",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Serrano Peppers" },
    update: {},
    create: {
      name: "Serrano Peppers",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Fruit(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Cilantro" },
    update: {},
    create: {
      name: "Cilantro",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Item(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Unsweetened Shredded Coconut" },
    update: {},
    create: {
      name: "Unsweetened Shredded Coconut",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Cup(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Red Onion" },
    update: {},
    create: {
      name: "Red Onion",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Vegetable(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Yellow Onion" },
    update: {},
    create: {
      name: "Yellow Onion",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Vegetable(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Zaatar" },
    update: {},
    create: {
      name: "Zaatar",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Cumin" },
    update: {},
    create: {
      name: "Cumin",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Oregano" },
    update: {},
    create: {
      name: "Oregano",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Toasted Walnuts" },
    update: {},
    create: {
      name: "Toasted Walnuts",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Cup(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Salt" },
    update: {},
    create: {
      name: "Salt",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Fire-Roasted Diced Tomatoes" },
    update: {},
    create: {
      name: "Fire-Roasted Diced Tomatoes",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Ounce(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Lemon Juice" },
    update: {},
    create: {
      name: "Lemon Juice",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Tablespoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Vegan Butter" },
    update: {},
    create: {
      name: "Vegan Butter",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Tablespoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Red Curry Paste" },
    update: {},
    create: {
      name: "Red Curry Paste",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Tablespoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Garam Masala" },
    update: {},
    create: {
      name: "Garam Masala",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Tablespoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Curry Powder" },
    update: {},
    create: {
      name: "Curry Powder",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Turmeric" },
    update: {},
    create: {
      name: "Turmeric",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Ginger" },
    update: {},
    create: {
      name: "Ginger",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Tomato Puree" },
    update: {},
    create: {
      name: "Tomato Puree",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Ounce(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Coconut Milk" },
    update: {},
    create: {
      name: "Coconut Milk",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Cup(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "All Purpose Plain Flour" },
    update: {},
    create: {
      name: "All Purpose Plain Flour",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Cup(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Sugar" },
    update: {},
    create: {
      name: "Sugar",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Cup(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Poppy Seeds" },
    update: {},
    create: {
      name: "Poppy Seeds",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Tablespoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Lemons" },
    update: {},
    create: {
      name: "Lemons",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Fruit(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Baking Powder" },
    update: {},
    create: {
      name: "Baking Powder",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Chickpeas" },
    update: {},
    create: {
      name: "Chickpeas",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Can(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Vanilla Extract" },
    update: {},
    create: {
      name: "Vanilla Extract",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Flaked Almonds" },
    update: {},
    create: {
      name: "Flaked Almonds",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Tablespoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Nutritional Yeast" },
    update: {},
    create: {
      name: "Nutritional Yeast",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Cup(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Vital Wheat Gluten" },
    update: {},
    create: {
      name: "Vital Wheat Gluten",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Cup(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Onion Powder" },
    update: {},
    create: {
      name: "Onion Powder",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Teaspoon(s)" },
        })
      ).id,
    },
  });

  await prisma.food.upsert({
    where: { name: "Red Lentils" },
    update: {},
    create: {
      name: "Red Lentils",
      measureId: (
        await prisma.measure.findUnique({
          where: { name: "Cup(s)" },
        })
      ).id,
    },
  });
}

module.exports = foods;
