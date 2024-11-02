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

module.exports = router;
