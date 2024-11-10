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
  res.render("boilerplate", {
    title: "New Recipe",
    template: "recipeform",
    dependency: dependency,
  });
});

exports.recipe_show_get = asyncHandler(async (req, res, next) => {
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
  res.render("boilerplate", {
    title: recipe.name,
    template: "recipeform",
    dependency: dependency,
  });
});
