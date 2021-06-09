const express = require("express");
const { getUsers, getUser, getUsersBySkill } = require("../controllers/users");

const router = express.Router();

/* GET skills listing. */
router.route("/").get(getUsers);

router.route("/:id").get(getUser);

router.route("/skills/:name")
  .get(getUsersBySkill);

module.exports = router;
