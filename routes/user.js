var express = require("express");
var router = express.Router();
const controller = require("../controllers/user");

//routes

router.post(
  "/signup",
  passport.authenticate("jwt", { session: false }),
  controller.sign_up_post
);

router.post(
  "/login",
  passport.authenticate("jwt", { session: false }),
  controller.login_post
);

module.exports = router;
