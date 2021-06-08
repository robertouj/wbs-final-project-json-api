const express = require("express");
const { getUsers, getUsersBySkill } = require("../controllers/users");

const router = express.Router();

/* GET skills listing. */
router.route("/").get(getUsers);

router.route("/skills/:name")
  .get(getUsersBySkill);

module.exports = router;
