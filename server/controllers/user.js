const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

exports.sign_up_post = [
  validateSignUp,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(409).json({ errors: errors.errors });
    } else if (
      await prisma.user.findUnique({
        where: {
          username: req.body.username,
        },
      })
    ) {
      res.status(409).json({ error: "Username already taken." });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          let user = await prisma.user.create({
            data: {
              username: req.body.username,
              password: hashedPassword,
            },
          });
          console.log(user);
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
    console.log(req.user);
    return res
      .status(200)
      .json({ username: req.user.username, id: req.user.id });
  }
  return res.status(401);
});
