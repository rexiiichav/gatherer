const express = require("express");
require("dotenv").config();
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const jwt = require("jsonwebtoken");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.COOKIE_SECRET,
};

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

//setup express
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 5000;

//import routers
const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");
const listRouter = require("./routes/list");
const foodRouter = require("./routes/food");
const measureRouter = require("./routes/measure");
const locationRouter = require("./routes/location");

//routers
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/list", listRouter);
app.use("/food", foodRouter);
app.use("/measure", measureRouter);
app.use("/location", locationRouter);

app.use("*", (req, res, next) => res.send("404"));
//confirmation log
app.listen(PORT, () => console.log("app listening..."));
