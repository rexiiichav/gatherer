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
  //Create list of all ingredients where key is food name and value is quantity, measure
  let ingredients = [];
  for (let r in req.body) {
    for (let x = Number(req.body[r]); x > 0; x--) {
      let recipe = await prisma.recipe.findUnique({
        where: { id: Number(r) },
        include: { ingredients: true },
      });
      for (let i in recipe.ingredients) {
        //ingredients has this element
        if (
          ingredients.find((e) => {
            return e.foodId == recipe.ingredients[i].foodId;
          })
        ) {
          let found = ingredients.find((e) => {
            return e.foodId == recipe.ingredients[i].foodId;
          });
          found.quantity = found.quantity + recipe.ingredients[i].quantity;
        } else {
          //create a new ing and assign it quantity + food
          ingredients.push(
            await prisma.ingredient.findUnique({
              where: { id: recipe.ingredients[i].id },
              include: { food: true },
            })
          );
        }
      }
    }
  }
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
  dependency.url = "/list/edit";
  dependency.errors = [];
  dependency.ingredients = ingredients;
  dependency.foods = foods;
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
        measure: true,
      },
    });
    food.quantity = req.body[ingredient][1];
    foods.push(food);
  }
  res.render("listshow", { title: "Grocery List", foods: foods });
});
