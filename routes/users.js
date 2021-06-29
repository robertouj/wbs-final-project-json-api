const express = require("express");
const {
  getUsers,
  getUser,
  getUsersBySkill,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const protect = require("../middlewares/auth");

const router = express.Router();

/* GET users listing. */
router.route("/").get(getUsers);

router
  .route("/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

router.route("/skills/:name").get(protect, getUsersBySkill);

module.exports = router;
