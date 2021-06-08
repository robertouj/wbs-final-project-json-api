const Skill = require('../models/Skill');

const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find();
    res.json({ success: true, msg: 'show all skills', data: skills })
  } catch(err) {
    next(err)
  }
}

module.exports = {
  getSkills,
}