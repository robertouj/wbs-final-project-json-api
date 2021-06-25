const express = require("express");
const { getUsers, getUser, getUsersBySkill, updateUser } = require("../controllers/users");

const router = express.Router();

/* GET skills listing. */
router.route("/").get(getUsers);

router.route("/:id")
  .get(getUser)
  .put(updateUser);

router.route("/skills/:name")
  .get(getUsersBySkill);

module.exports = router;
