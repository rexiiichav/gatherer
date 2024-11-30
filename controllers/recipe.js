const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

exports.recipe_create_get = asyncHandler(async (req, res, next) => {
  let dependency = {};
  dependency.url = "/recipe/new";
  dependency.errors = [];
  dependency.ingredients = [];
  const foods = await prisma.food.findMany({
    include: {
      measure: true,
    },
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  dependency.foods = foods;
  res.render("recipeform", {
    title: "New Recipe",
    dependency: dependency,
  });
});

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
      let ingredient = await prisma.ingredient.create({
        data: {
          foodId: food.id,
          recipeId: recipe.id,
          quantity: Number(req.body[i][1]),
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

exports.recipe_edit_get = asyncHandler(async (req, res, next) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  const ingredients = await prisma.ingredient.findMany({
    where: {
      recipeId: Number(req.params.id),
    },
    include: {
      food: true,
    },
  });
  const foods = await prisma.food.findMany({
    include: {
      measure: true,
    },
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  let dependency = {};
  dependency.recipe = recipe;
  dependency.foods = foods;
  dependency.errors = [];
  dependency.ingredients = ingredients;
  res.render("recipeform", {
    title: "Edit Recipe",
    template: "recipeform",
    dependency: dependency,
  });
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
      let ingredient = await prisma.ingredient.create({
        data: {
          foodId: food.id,
          recipeId: recipe.id,
          quantity: Number(req.body[i][1]),
        },
      });
      await prisma.recipe.update({
        where: { name: req.body.name },
        data: { ingredients: { connect: { id: ingredient.id } } },
      });
    }
  }
  console.log(
    await prisma.recipe.findUnique({
      where: { id: recipe.id },
      include: { ingredients: true },
    })
  );
  res.redirect("/recipe/index");
});

exports.recipe_index_get = asyncHandler(async (req, res, next) => {
  const recipes = await prisma.recipe.findMany();
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
