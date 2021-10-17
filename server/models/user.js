const mongoose = require("mongoose");

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

module.exports = User;
