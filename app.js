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

//routers
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("/list", listRouter);

app.use("*", (req, res, next) => res.send("404"));
//confirmation log
app.listen(PORT, () => console.log("app listening..."));
