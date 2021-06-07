const express = require("express");
const { getUsers } = require("../controllers/users");

const router = express.Router();

/* GET skills listing. */
router.route("/").get(getUsers);

module.exports = router;
