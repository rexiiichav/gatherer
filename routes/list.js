var express = require("express");
var router = express.Router();
const controller = require("../controllers/list");

function protectRoute(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/user/login");
  }
}

//routes
router.get("/new", protectRoute, controller.list_create_get);
router.post("/new", protectRoute, controller.list_create_post);

router.post("/edit", protectRoute, controller.list_edit_post);

module.exports = router;
