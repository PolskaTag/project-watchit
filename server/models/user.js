const { boolean, date } = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Uda, udaSchema } = require("./uda");

// User schema that we'll leverage when accessing db
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: false,
    },
    videos: [
      {
        videoID: String,
        url: String,
        name: String,
        time: Date,
      },
    ],
    pictures: [
      {
        pictureID: String,
        url: String,
        name: String,
        time: Date,
      },
    ],
    uda: [udaSchema],
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema);

//added below
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
//added above

module.exports = User;
