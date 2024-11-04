const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
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

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  let dependency = {};
  dependency.url = "/user/signup";
  dependency.errors = [];
  res.render("userform", {
    title: "Sign Up",
    dependency: dependency,
  });
});

exports.sign_up_post = [
  validateSignUp,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let dependency = {};
      dependency.url = "/user/signup";
      dependency.errors = errors.errors;
      res.render("boilerplate", {
        title: "Sign Up",
        template: "userForm",
        dependency: dependency,
      });
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
      res.redirect("/user/login");
    }
  }),
];

exports.login_get = asyncHandler(async (req, res, next) => {
  let dependency = {};
  dependency.url = "/user/login";
  dependency.errors = [];
  res.render("userform", {
    title: "Log In",
    dependency: dependency,
  });
});

exports.login_failed_get = asyncHandler(async (req, res, next) => {
  let dependency = {};
  dependency.url = "/user/login";
  dependency.errors = [{ msg: "Incorrect Username or Password" }];
  res.render("userform", {
    title: "Log In",
    dependency: dependency,
  });
});

exports.login_post = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login/failed",
  })(req, res, next);
});

exports.logout_post = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/user/login");
  });
});
