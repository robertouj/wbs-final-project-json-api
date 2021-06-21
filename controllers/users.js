const User = require("../models/User");
const Skill = require("../models/Skill");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("skills");

    const response = await User.find().populate("skills");
    //console.log(response);

    res.json({ success: true, msg: "show all users", data: users });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("skills");
    res.json({ success: true, msg: 'show selected user', data: user })
  } catch(err) {
    next(err)
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

const updateUser = (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, photo, bio, experience, availability, skills } = req.body;
    //console.log(skills);
    const data = {
      "name": "roberto"
    }

    
    const newSkills = checkSkillNames(skills);

    //const response = User.find().populate("skills");
    //console.log();



    const user = User.findByIdAndUpdate(id, { skills: newSkills }, { new: true });
    res.json({ success: true, msg: `user with id ${id} updateds`, data: data })
  } catch(err) {
    next(err)
  }
};

const checkSkillNames =  async (skills) => {
  return await skills?.map( async (skill) => {
    const resp = await Skill.find({name: skill.name});
    if(resp[0]?.name) return skill;    
    else {
      const newSkill = await Skill.create({ name: skill.name});      
      return newSkill;
    }    
  })
}


module.exports = {
  getUsers,
  getUser,
  updateUser,
  getUsersBySkill,
};


/*
{
    "_id": "60be54163e9bbcd950a171c2",
    "skills": [
            {
                "_id": "60be5aa03e9bbcd950a171c5",
                "name": "React"
            },
            {
                "_id": "60be5a8f3e9bbcd950a171c4",
                "name": "JavaScript"
            },
            {
                "name": "SpeakGerman"
            }
        ]
}

*/