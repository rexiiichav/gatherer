const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

exports.list_create_get = asyncHandler(async (req, res, next) => {
  let dependency = {};
  dependency.url = "/list/new";
  const recipes = await prisma.recipe.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  dependency.recipes = recipes;
  dependency.errors = [];
  res.render("listform", {
    title: "New List",
    dependency: dependency,
  });
});

exports.list_create_post = asyncHandler(async (req, res, next) => {
  let list = [];
  let chosenRecipes = listChosenRecipes(req.body);
  let ingredients = await listIngredients(chosenRecipes);
  ingredients = await convertIngredients(ingredients);
  // ingredients = consolidateIngredients(ingredients);
  // ingredients = fixMeasures(ingredients);
  const foods = await prisma.food.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  const measures = await prisma.measure.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  let dependency = {};
  dependency.url = "/list/edit";
  dependency.errors = [];
  dependency.ingredients = ingredients;
  dependency.foods = foods;
  dependency.measures = measures;
  res.render("recipeform", {
    title: "Edit Grocery List",
    dependency: dependency,
  });
});

exports.list_edit_post = asyncHandler(async (req, res, next) => {
  let foods = [];
  for (let ingredient in req.body) {
    let food = await prisma.food.findUnique({
      where: {
        name: req.body[ingredient][0],
      },
      include: {
        location: true,
      },
    });
    food.quantity = req.body[ingredient][1];
    food.measure = {};
    food.measure.name = req.body[ingredient][2];
    foods.push(food);
  }
  //Sort alphabetically
  foods = foods.sort((a, b) => b.name.localeCompare(a.name));
  let locations = await prisma.location.findMany({});
  res.render("listshow", {
    title: "Grocery List",
    foods: foods,
    locations: locations,
  });
});

//utility

function listChosenRecipes(recipes) {
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
  let cups = await prisma.measure.findUnique({ where: { name: "Cup(s)" } });
  let pounds = await prisma.measure.findUnique({ where: { name: "Pound(s)" } });
  for (ingredient of ingredients) {
    ingredient.quantity = ingredient.quantity * ingredient.measure.conversion;
    if (ingredient.measure.aggregateByVolume) {
      ingredient.measureId = cups.id;
      ingredient.measure = cups;
    } else if (ingredient.measure.aggregateByWeight) {
      ingredient.measureId = pounds.id;
      ingredient.measure = pounds;
    }
  }
  return ingredients;
}

function consolidateIngredients(ingredients) {
  let list = [];
  for (ingredient of ingredients) {
    let matchedIngredients = ingredients.filter((i) => {
      i.foodId == ingredient.foodId && i.id != ingredient.id;
    });
    for (match of matchedIngredients) {
      if (
        (match.aggregateByVolume && ingredient.aggregateByVolume) ||
        (match.aggregateByWeight && ingredient.aggregateByWeight) ||
        match.measure.id == ingredient.measure.id
      ) {
        ingredient.quantity = ingredient.quantity + match.quantity;
      }
    }
  }
}

async function fixMeasures(ingredients) {}
