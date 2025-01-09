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

// router.get(
//   "/index",
//   passport.authenticate("jwt", { session: false }),
//   controller.recipe_index_get
// );

// router.get(
//   "/edit/:id",
//   passport.authenticate("jwt", { session: false }),
//   controller.recipe_edit_get
// );
// router.post(
//   "/edit/:id",
//   passport.authenticate("jwt", { session: false }),
//   controller.recipe_edit_post
// );

// router.post(
//   "/delete/:id",
//   passport.authenticate("jwt", { session: false }),
//   controller.recipe_delete_post
// );

module.exports = router;
