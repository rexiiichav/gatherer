var express = require("express");
var router = express.Router();
const controller = require("../controllers/recipe");
const passport = require("passport");

//routes

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  controller.recipe_create_post
);

router.get(
  "/index",
  passport.authenticate("jwt", { session: false }),
  controller.recipe_index_get
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.recipe_show_get
);

router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  controller.recipe_edit_post
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  controller.recipe_delete_delete
);

module.exports = router;
