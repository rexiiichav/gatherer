const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: payload.username,
        },
      });
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

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
    console.log(req.body);
    if (!errors.isEmpty()) {
      res.status(409).json({ errors: errors.errors });
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
  opt.expiresIn = 600;
  const secret = process.env.COOKIE_SECRET;
  const token = jwt.sign({ username }, secret, opt);
  return res.status(200).json({
    message: "Success",
    token,
  });
});
