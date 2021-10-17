const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    role:{
        type: Number,
        default: 0
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema);

//added below
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
//added above

module.exports = User;
