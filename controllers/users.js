const User = require("../models/User");
const Skill = require("../models/Skill");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("skills");

    res.json({ success: true, msg: "show all users", data: users });
  } catch (err) {
    next(err);
  }
};

const getUsersBySkill = async (req, res, next) => {
  try {
    const { name } = req.params;

    /**
     * - find({ "name": { "$regex": "", "$options": "i" } }, "_id")
     * 
     *   This expression search a string inside other string in the field name and is no case sensitive.
     * 
     *   The second parameter "_id" is the selection of fields to show in the result, that 
     *   is the necessary format for the array in the .in() of the next command.
     * 
     * - User.find().where("skills").in(skills).populate("skills")
     * 
     *   Create a query for the field "skills" and the values in the array "skills".
     *   The array of ids need to be in the form: 
     *   ["_id": "60be5aa03e9bbcd950a171c5","_id": "60be5a8f3e9bbcd950a171c4",]
     * 
     */    
    //TODO: encode uri in frontend. Decode uri here. change spaces for |
    const skills = await Skill.find({ "name": { "$regex": name, "$options": "i" } }, "_id");
    const users = await User.find().where("skills").in(skills).populate("skills");

    res.json({ success: true, msg: "show all users", data: users });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUsersBySkill,
};
