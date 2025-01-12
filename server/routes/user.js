var express = require("express");
var router = express.Router();
const controller = require("../controllers/user");

//routes

router.post("/signup", controller.sign_up_post);

router.post("/login", controller.login_post);

module.exports = router;
