const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.recipe_create_post = asyncHandler(async (req, res, next) => {
  let recipe = await prisma.recipe.create({
    data: {
      name: req.body.name,
    },
  });
  for (let i in req.body) {
    if (i !== "name") {
      let food = await prisma.food.findUnique({
        where: { name: req.body[i][0] },
      });
      let measure = await prisma.measure.findUnique({
        where: { name: req.body[i][2] },
      });
      let ingredient = await prisma.ingredient.create({
        data: {
          foodId: food.id,
          recipeId: recipe.id,
          quantity: Number(req.body[i][1]),
          measureId: measure.id,
        },
      });
      await prisma.recipe.update({
        where: { name: req.body.name },
        data: { ingredients: { connect: { id: ingredient.id } } },
      });
    }
  }
  res.redirect("/recipe/index");
});

exports.recipe_edit_post = asyncHandler(async (req, res, next) => {
  let recipe = await prisma.recipe.update({
    where: { id: Number(req.params.id) },
    data: {
      name: req.body.name,
    },
  });
  await prisma.ingredient.deleteMany({
    where: { recipeId: recipe.id },
  });
  for (let i in req.body) {
    if (i !== "name") {
      let food = await prisma.food.findUnique({
        where: { name: req.body[i][0] },
      });
      let measure = await prisma.measure.findUnique({
        where: { name: req.body[i][2] },
      });
      let ingredient = await prisma.ingredient.create({
        data: {
          foodId: food.id,
          recipeId: recipe.id,
          quantity: Number(req.body[i][1]),
          measureId: measure.id,
        },
      });
      await prisma.recipe.update({
        where: { name: req.body.name },
        data: { ingredients: { connect: { id: ingredient.id } } },
      });
    }
  }
  res.redirect("/recipe/index");
});

exports.recipe_index_get = asyncHandler(async (req, res, next) => {
  const recipes = await prisma.recipe.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  let dependency = {};
  dependency.recipes = recipes;
  res.render("recipeindex", {
    title: "All Recipes",
    template: "recipeindex",
    dependency: dependency,
  });
});

exports.recipe_delete_post = asyncHandler(async (req, res, next) => {
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
  res.redirect("/recipe/index");
});
