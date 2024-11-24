var express = require("express");
var router = express.Router();
const controller = require("../controllers/list");

function protectRoute(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/admin/login");
  }
}

//routes
//Give the number options to select recipes to add to list (this is home page)
router.get("/new", protectRoute, controller.list_create_get);
router.post("/new", protectRoute, controller.list_create_post);

//Once recipes selected, display all ingredients summed and allow the addition of new ingredients
// router.get("/edit", protectRoute, controller.list_edit_get);
router.post("/edit", protectRoute, controller.list_edit_post);

//Once final list is generated, take in the final configuration and display it in a copy-pasteable format
// router.post("/show", protectRoute, controller.list_delete_post);

module.exports = router;
