const express = require("express");
const { createUser, getMe } = require("../controllers/users");
const protect = require('../middlewares/auth');

const router = express.Router();

// register
router.route("/register").post(createUser);
router.get('/me', protect, getMe);

module.exports = router;
