const User = require('../models/Skill');
const mongoose = require('mongoose');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, msg: 'show all users', data: users })
  } catch(err) {
    next(err)
  }
}

module.exports = {
  getUsers,
}