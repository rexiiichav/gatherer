var express = require("express");
var router = express.Router();
const controller = require("../controllers/list");

//routes
// router.get(
//   "/new",
//   passport.authenticate("jwt", { session: false }),
//   controller.list_create_get
// );
// router.post(
//   "/new",
//   passport.authenticate("jwt", { session: false }),
//   controller.list_create_post
// );

// router.post(
//   "/edit",
//   passport.authenticate("jwt", { session: false }),
//   controller.list_edit_post
// );

module.exports = router;
