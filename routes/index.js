const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
      title: "Time Banking Plattform - WBS Bootcamp Final Project",
    });
});

module.exports = router;