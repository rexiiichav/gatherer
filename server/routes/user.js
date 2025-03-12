var express = require("express");
var router = express.Router();
const controller = require("../controllers/user");
const passport = require("passport");

//routes

router.post("/signup", controller.sign_up_post);

router.post("/login", controller.login_post);

router.get(
  "/show",
  passport.authenticate("jwt", { session: false }),
  controller.user_get
);

module.exports = router;
