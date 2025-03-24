const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.recipe_create_post = asyncHandler(async (req, res, next) => {
  //-d '{"name": "Foodzs", "ingredients": [{"foodId": 76, "measureId": 64, "quantity": 3}] }'
  let recipe = await prisma.recipe.create({
    data: {
      name: req.body.name,
      authorId: Number(req.user.id),
    },
  });
  for (let ing of req.body.ingredients) {
    let ingredient = await prisma.ingredient.create({
      data: {
        foodId: ing.foodId,
        recipeId: recipe.id,
        quantity: ing.quantity,
        measureId: ing.measureId,
      },
    });
    await prisma.recipe.update({
      where: { id: recipe.id },
      data: { ingredients: { connect: { id: ingredient.id } } },
    });
  }
  res.status(200).json({ message: "Success" });
});

exports.recipe_index_get = asyncHandler(async (req, res, next) => {
  const recipes = await prisma.recipe.findMany({
    where: { authorId: Number(req.user.id) },
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  res.status(200).json({ message: "Success", recipes: recipes });
});

exports.recipe_show_get = asyncHandler(async (req, res, next) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: { ingredients: { include: { food: true, measure: true } } },
  });
  res.status(200).json({ message: "Success", recipe: recipe });
});

exports.recipe_edit_post = asyncHandler(async (req, res, next) => {
  let recipe = await prisma.recipe.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (Number(recipe.authorId) !== Number(req.user.id)) {
    res.status(401).json({ message: "Not Authorized" });
  }
  recipe = await prisma.recipe.update({
    where: { id: Number(req.params.id) },
    data: {
      name: req.body.name,
    },
  });
  await prisma.ingredient.deleteMany({
    where: { recipeId: recipe.id },
  });
  for (let ing of req.body.ingredients) {
    let ingredient = await prisma.ingredient.create({
      data: {
        foodId: ing.foodId,
        recipeId: recipe.id,
        quantity: ing.quantity,
        measureId: ing.measureId,
      },
    });
    await prisma.recipe.update({
      where: { id: recipe.id },
      data: { ingredients: { connect: { id: ingredient.id } } },
    });
  }
  res.status(200).json({ message: "Success" });
});

exports.recipe_delete_delete = asyncHandler(async (req, res, next) => {
  let recipe = await prisma.recipe.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (Number(recipe.authorId) !== Number(req.user.id)) {
    res.status(401).json({ message: "Not Authorized" });
  }
  await prisma.ingredient.deleteMany({
    where: {
      recipeId: Number(req.params.id),
    },
  });
  await prisma.recipe.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(200).json({ message: "Success" });
});
