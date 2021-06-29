const express = require("express");
const { createUser, getMe, login } = require("../controllers/users");
const protect = require('../middlewares/auth');

const router = express.Router();

// register
router.route("/register").post(createUser);
router.route("/login").post(login);
router.get('/me', protect, getMe);

module.exports = router;
