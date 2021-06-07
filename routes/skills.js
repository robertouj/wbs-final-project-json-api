const express = require("express");
const { getSkills } = require("../controllers/skills");

const router = express.Router();

/* GET skills listing. */
router.route("/").get(getSkills);

module.exports = router;
