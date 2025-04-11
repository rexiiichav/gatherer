const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateSignUp = [
  body("username").isEmail().withMessage("Username Must Be a Valid Email"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 100 })
    .withMessage(`Password Must Be Between 8 and 100 Characters`),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      return value == req.body.password;
    })
    .withMessage("Passwords Must Match"),
];

exports.sign_up_post = [
  validateSignUp,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let messages = errors.errors.map((err) => {
        return err.msg;
      });
      res.status(409).json({ errors: messages });
    } else if (
      await prisma.user.findUnique({
        where: {
          username: req.body.username,
        },
      })
    ) {
      res.status(409).json({ errors: ["Username Already Taken"] });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          await prisma.user.create({
            data: {
              username: req.body.username,
              password: hashedPassword,
            },
          });
        } catch {
          next(err);
        }
      });
      res.status(200).json({ message: "Success" });
    }
  }),
];

exports.login_post = asyncHandler(async (req, res, next) => {
  let { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Auth Failed" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Auth Failed" });
  }
  let opt = {};
  opt.expiresIn = "3 days";
  const secret = process.env.COOKIE_SECRET;
  const token = jwt.sign({ username }, secret, opt);
  return res.status(200).json({
    message: "Success",
    token,
  });
});

exports.user_get = asyncHandler(async (req, res, next) => {
  if (req.user) {
    return res
      .status(200)
      .json({ username: req.user.username, id: req.user.id });
  }
  return res.status(401);
});

exports.user_delete = asyncHandler(async (req, res, next) => {
  let recipes = await prisma.recipe.findMany({
    where: { authorId: Number(req.user.id) },
  });
  for (recipe of recipes) {
    await prisma.ingredient.deleteMany({
      where: {
        recipeId: Number(recipe.id),
      },
    });
    await prisma.recipe.delete({
      where: {
        id: Number(recipe.id),
      },
    });
  }
  await prisma.user.delete({
    where: {
      id: Number(req.user.id),
    },
  });
  return res.status(200).json({ message: "success" });
});
