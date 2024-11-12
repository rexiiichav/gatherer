const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const validateSignUp = [
  body("username")
    .trim()
    .matches(/^[a-z0-9 ]+$/i)
    .withMessage(`Name Cannot Contain Non-Alphanumeric Characters`)
    .isLength({ min: 1, max: 100 })
    .withMessage(`Must Be Between 1 and 100 Characters`),
  body("password")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`Must Be Between 1 and 100 Characters`),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      return value == req.body.password;
    })
    .withMessage("Passwords must match"),
];

exports.recipe_create_get = asyncHandler(async (req, res, next) => {
  let dependency = {};
  dependency.url = "/recipe/new";
  dependency.errors = [];
  dependency.ingredients = [];
  const foods = await prisma.food.findMany({
    include: {
      measure: true,
    },
  });
  dependency.foods = foods;
  res.render("recipeform", {
    title: "New Recipe",
    dependency: dependency,
  });
});

exports.recipe_edit_get = asyncHandler(async (req, res, next) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      ingredients: true,
    },
  });
  let dependency = {};
  dependency.recipe = recipe;
  res.render("recipeform", {
    title: "Edit Recipe",
    template: "recipeform",
    dependency: dependency,
  });
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

exports.recipe_delete_put = asyncHandler(async (req, res, next) => {
  await prisma.recipe.delete({
    where: {
      id: req.params.id,
    },
    include: {
      ingredients: true,
    },
  });
  res.redirect("/recipe/show");
});
