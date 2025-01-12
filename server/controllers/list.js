const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list_create_post = asyncHandler(async (req, res, next) => {
  let list = [];
  let chosenRecipes = listChosenRecipes(req.body);
  let ingredients = await listIngredients(chosenRecipes);
  ingredients = await convertIngredients(ingredients);
  ingredients = consolidateIngredients(ingredients, []);
  ingredients = await fixMeasures(ingredients);
  res.status(200).json({ message: "Success", ingredients });
});

exports.list_edit_post = asyncHandler(async (req, res, next) => {
  let foods = [];
  for (let ingredient in req.body.ingredients) {
    let food = await prisma.food.findUnique({
      where: {
        name: ingredient.id,
      },
      include: {
        location: true,
      },
    });
    food.quantity = ingredient.quantity;
    food.measure = await prisma.measure.findUnique({
      where: { id: ingredient.measureId },
    });
    food.foodId = food.id;
    food.measureId = food.measure.id;
    foods.push(food);
  }
  foods = await convertIngredients(foods);
  foods = await consolidateIngredients(foods, []);
  foods = await fixMeasures(foods);

  foods = foods.sort((a, b) => b.name.localeCompare(a.name));
  res.status(200).json({ message: "Success", foods });
});

//utility

function listChosenRecipes(recipes) {
  //remove all recipes that were not chosen
  for (recipe in recipes) {
    if (recipes[recipe] == 0) {
      delete recipes[recipe];
    }
  }
  return recipes;
}

async function listIngredients(recipes) {
  let ingredients = [];
  for (let key in recipes) {
    let recipe = await prisma.recipe.findUnique({
      where: { id: Number(key) },
      include: { ingredients: true },
    });
    for (let ing in recipe.ingredients) {
      let ingredient = await prisma.ingredient.findUnique({
        where: { id: recipe.ingredients[ing].id },
        include: { food: true, measure: true },
      });
      ingredient.quantity = ingredient.quantity * recipes[key];
      ingredients.push(ingredient);
    }
  }
  return ingredients;
}

async function convertIngredients(ingredients) {
  let gallons = await prisma.measure.findUnique({
    where: { name: "Gallon(s)" },
  });
  let pounds = await prisma.measure.findUnique({ where: { name: "Pound(s)" } });
  for (ingredient of ingredients) {
    ingredient.quantity = ingredient.quantity * ingredient.measure.conversion;
    if (ingredient.measure.aggregateByVolume) {
      ingredient.measureId = gallons.id;
      ingredient.measure = gallons;
    } else if (ingredient.measure.aggregateByWeight) {
      ingredient.measureId = pounds.id;
      ingredient.measure = pounds;
    }
  }
  return ingredients;
}

function consolidateIngredients(ingredients, list) {
  if (ingredients.length == 0) {
    return list;
  }
  let unconsolidatedIngredients = [];
  for (let i = 1; i < ingredients.length; i++) {
    if (
      ingredients[i].foodId == ingredients[0].foodId &&
      ingredients[i].measureId == ingredients[0].measureId
    ) {
      ingredients[0].quantity =
        ingredients[0].quantity + ingredients[i].quantity;
    } else {
      unconsolidatedIngredients.push(ingredients[i]);
    }
  }
  list.push(ingredients[0]);
  return consolidateIngredients(unconsolidatedIngredients, list);
}

async function fixMeasures(ingredients) {
  let byVolume = await prisma.measure.findMany({
    where: { aggregateByVolume: true },
    orderBy: [
      {
        conversion: "desc",
      },
    ],
  });
  let byWeight = await prisma.measure.findMany({
    where: { aggregateByWeight: true },
    orderBy: [
      {
        conversion: "desc",
      },
    ],
  });
  for (ingredient of ingredients) {
    if (ingredient.measure.aggregateByVolume) {
      for (measure in byVolume) {
        let calc = ingredient.quantity / byVolume[measure].conversion;
        calc = calc.toFixed(2);
        if (
          (calc >= 0.95 && calc % 0.25 == 0) ||
          byVolume[measure].name == "Teaspoon(s)"
        ) {
          ingredient.quantity = (
            ingredient.quantity / byVolume[measure].conversion
          ).toFixed(2);
          ingredient.measure = byVolume[measure];
          ingredient.measureId = byVolume[measure].id;
          break;
        }
      }
    } else if (ingredient.measure.aggregateByWeight) {
      for (measure in byWeight) {
        let calc = ingredient.quantity / byWeight[measure].conversion;
        calc = calc.toFixed(2);
        if (
          (calc >= 0.25 && calc % 0.25 == 0) ||
          byWeight[measure].name == "Gram(s)"
        ) {
          ingredient.quantity = (
            ingredient.quantity / byWeight[measure].conversion
          ).toFixed(2);
          ingredient.measure = byWeight[measure];
          ingredient.measureId = byWeight[measure].id;
          break;
        }
      }
    }
  }
  return ingredients;
}
