const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availabilitySchema = new mongoose.Schema({
  schedule: {
    type: Boolean,
    required: [true, "Please add option schedule"],
    default: false,
  },
  live: {
    type: Boolean,
    required: [true, "Please add option live"],
    default: false,
  },
},
{
  versionKey: false, // remove the version parameter __v
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    maxlength: [50, "Only max 50 chars are allowed for the name"],
  },
  photo: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
    maxlength: [500, "Maximum 500 characters"],
  },
  experience: {
    type: Number,
    required: false,
    min: 0,
    default: 0,
  },
  availability: {
    type: availabilitySchema,
    _id: false,
    required: [true, "Please add availability"],
  },
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  ],
},
{
  versionKey: false, // remove the version parameter __v
});

module.exports = mongoose.model("User", UserSchema);
