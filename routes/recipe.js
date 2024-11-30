var express = require("express");
var router = express.Router();
const controller = require("../controllers/recipe");

function protectRoute(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/user/login");
  }
}

//routes
router.get("/new", protectRoute, controller.recipe_create_get);
router.post("/new", protectRoute, controller.recipe_create_post);

router.get("/index", protectRoute, controller.recipe_index_get);

router.get("/edit/:id", protectRoute, controller.recipe_edit_get);
router.post("/edit/:id", protectRoute, controller.recipe_edit_post);

router.post("/delete/:id", protectRoute, controller.recipe_delete_post);

module.exports = router;
