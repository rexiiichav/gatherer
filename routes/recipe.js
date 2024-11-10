var express = require("express");
var router = express.Router();
const controller = require("../controllers/food");

function protectRoute(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/admin/login");
  }
}

//routes
router.get("/new", protectRoute, controller.recipe_create_get);
// router.put("/new", protectRoute, controller.recipe_create_put);

// router.get("/show/:id", protectRoute, controller.recipe_show_get);

// router.get("/edit/:id", protectRoute, controller.recipe_edit_get);
// router.put("/edit/:id", protectRoute, controller.recipe_edit_put);

// router.put("/delete/:id", protectRoute, controller.recipe_delete_put);

module.exports = router;
