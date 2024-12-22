const express = require("express");
require("dotenv").config();
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");

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

const PORT = process.env.PORT || 5000;

//import routers
const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");
const listRouter = require("./routes/list");

//routers
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/list", listRouter);
app.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/recipe/index");
  } else {
    res.redirect("/user/login");
  }
});

app.use("*", (req, res, next) => res.send("404"));
//confirmation log
app.listen(PORT, () => console.log("app listening..."));
