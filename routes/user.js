var express = require("express");
var router = express.Router();
const controller = require("../controllers/user");

function protectRoute(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/admin/login");
  }
}

//routes
router.get("/signup", controller.sign_up_get);
router.post("/signup", controller.sign_up_post);

module.exports = router;
