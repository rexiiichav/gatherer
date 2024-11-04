var express = require("express");
var router = express.Router();
const controller = require("../controllers/user");

function protectRoute(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/user/login");
  }
}

//routes
router.get("/signup", controller.sign_up_get);
router.post("/signup", controller.sign_up_post);

router.get("/login", controller.login_get);
router.post("/login", controller.login_post);
router.get("/login/failed", controller.login_failed_get);
router.post("/logout", controller.logout_post);

module.exports = router;
