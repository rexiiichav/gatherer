var express = require("express");
var router = express.Router();
const controller = require("../controllers/location");
const passport = require("passport");

//routes

router.get(
  "/index",
  passport.authenticate("jwt", { session: false }),
  controller.location_index_get
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.location_show_get
);

module.exports = router;
