const User = require("../models/User");
const Skill = require("../models/Skill");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("skills");

    res.json({ success: true, msg: "show all users", data: users });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("skills");
    res.json({ success: true, msg: "show selected user", data: user });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.json({
    success: true,
    data: user
  });
}

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
    const skills = await Skill.find(
      { name: { $regex: name, $options: "i" } },
      "_id"
    );
    const users = await User.find()
      .where("skills")
      .in(skills)
      .populate("skills");

    res.json({ success: true, msg: "show all users", data: users });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {

    // insert user
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });

    // create token
    const token = user.getSignedJwtToken();

    res.json({ success: true, token })
  } catch(err) {
    next(err)
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { name, photo, bio, experience, availability, skills, email, password } = req.body;
    const { email, password } = req.body;
    //const newSkillsArray = await getSkillsArray(skills);

    const user = await User.findByIdAndUpdate(
      id,
      // { name, photo, bio, experience, availability, skills: newSkillsArray, email, password },
      { email, password },
      { new: true }
    );

    res.json({
      success: true,
      msg: `user with id ${id} updated`,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    res.json({ success: true, msg: `user with id ${id} deleted`, data: user })
  } catch(err) {
    next(err) 
  }
};

const getSkillsArray = async (skills) => {
  return Promise.all(
    skills?.map(async (skill) => {
      const isNewSkill = await checkNewSkill(skill.name);
      if (isNewSkill) {
        const newSkill = await createSkill(skill);
        return {
          _id: String(newSkill._id),
        };
      }
      return {
        _id: skill._id,
      };
    })
  );
};

const checkNewSkill = async (skillName) => {
  const resp = await Skill.find({ name: skillName });
  if (resp.length === 0) return true;
  return false;
};

const createSkill = async (skill) => {
  const newSkill = skill._id
    ? await Skill.create({ _id: ObjectId(skill._id), name: skill.name })
    : await Skill.create({ name: skill.name });
  return newSkill;
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send('Please provide an email and password');
      return;
    }

    // needed +password because is not selected in the model 
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).send('Invalid credentials');
      return;
    }
    console.log(user);

    const doesPassMatch = await user.matchPassword(password);
    if (!doesPassMatch) {
      res.status(401).send('Invalid credentials');
      return;
    }

    const token = user.getSignedJwtToken();

    res.json({ success: true, token })

  } catch(err) {
    next(err)
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersBySkill,
  getMe,
  login,
};
