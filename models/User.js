const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  // name: {
  //   type: String,
  //   required: [true, "Please add a name"],
  //   maxlength: [50, "Only max 50 chars are allowed for the name"],
  // },
  // photo: {
  //   type: String,
  //   required: false,
  // },
  // bio: {
  //   type: String,
  //   required: false,
  //   maxlength: [500, "Maximum 500 characters"]get,
  // },
  // experience: {
  //   type: Number,
  //   required: false,
  //   min: 0,
  //   default: 0,
  // },
  // availability: {
  //   type: availabilitySchema,
  //   _id: false,
  //   required: [true, "Please add availability"],
  // },
  // skills: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Skill",
  //     required: true,
  //   },
  // ],
  username: {
    type: String,
    required: [true, 'Please add a user name'],
    maxlength: [15, 'Only max 15 chars are allowed for the user name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false // don't show the password in the API
  },
},
{
  versionKey: false, // remove the version parameter __v
});

// hash password
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre('findOneAndUpdate', function(next) {
  this._update.password = bcrypt.hashSync(this._update.password, 10)
  next();
});

UserSchema.methods.getSignedJwtToken = function() {
  // return jwt.sign({ id: this._id, username: this.username, email: this.email, password: this.password }, process.env.JWT_SECRET)
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
}

// math user entered password ot hashed password in db
UserSchema.methods.matchPassword = async function(enteredPass) {
  return await bcrypt.compare(enteredPass, this.password)
}

module.exports = mongoose.model("User", UserSchema);
