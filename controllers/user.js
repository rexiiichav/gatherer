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
      const user = await prisma.admin.findUnique({
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
      if (!user.approved) {
        //user is not approved
        return done(null, false, { message: "Not Approved" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  let dependency = {};
  dependency.url = "/user/signup";
  res.render("boilerplate", {
    title: "Sign Up",
    template: "userForm",
    dependency: dependency,
  });
});

exports.sign_up_post = asyncHandler(async (req, res, next) => {
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
});
