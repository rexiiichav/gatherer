const express = require("express");
const session = require("express-session");
require("dotenv").config();
const path = require("path");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

//auth
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findOne({
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

//setup express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "ejs");
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(express.static("public"));

//setup express session + session store
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

//import routers
const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");
//routers
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);

app.use("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/user/login");
  }
});
app.use("*", (req, res, next) => res.send("404"));
//confirmation log
app.listen(PORT, () => console.log("app listening..."));
