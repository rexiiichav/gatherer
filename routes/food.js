var express = require("express");
var router = express.Router();
const controller = require("../controllers/food");
const passport = require("passport");

//routes

router.get(
  "/index",
  passport.authenticate("jwt", { session: false }),
  controller.food_index_get
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.food_show_get
);

module.exports = router;
