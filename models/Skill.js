const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  name: {
    type: String,
    minLength: [2, "Maximum 500 characters"],
    maxLength: [50, "Maximum 500 characters"],
    required: [true, "Please add the skill"],
  },
},
{
  versionKey: false, // remove the version parameter __v
});

module.exports = mongoose.model("Skill", SkillSchema);
