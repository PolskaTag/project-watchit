require("dotenv").config({ path: "../config.env" });

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const verifyJWT = require("../verifyJWT");
const jwt = require("jsonwebtoken");
const { registrationValidation, loginValidation } = require("../validation");

const router = express.Router();

router.get("/isUserAuth", verifyJWT, (req, res) => {
  console.log(req.user);
  results = res.json({ isLoggedIn: true, username: req.user.username });
  // console.log(results.username);
  return results;
});

router.route("/login").post((req, res) => {
  console.log("::::::FUNCTION LOGIN::::::::");
  console.log(req.body);
  const userLoggingIn = req.body;

  if (!userLoggingIn) return res.json({ message: "Server Error" });

  const validationError = loginValidation(userLoggingIn).error;

  if (validationError) {
    return res.json({ message: validationError.details[0].message });
  } else {
    User.findOne({ username: userLoggingIn.username.toLowerCase() }).then(
      (dbUser) => {
        if (!dbUser) {
          return res.json({ message: "Invalid Username or Password" });
        }
        bcrypt
          .compare(userLoggingIn.password, dbUser.password)
          .then((isCorrect) => {
            if (isCorrect) {
              const payload = {
                id: dbUser._id,
                username: dbUser.username,
              };
              // console.log(process.env.JWT_SECRET);
              const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 86400 },
                (err, token) => {
                  return res.json({
                    message: "Success",
                    token: "Bearer " + token,
                    username: userLoggingIn.username.toLowerCase()
                  });
                }
              );
            } else {
              return res.json({ message: "Invalid Username or Password" });
            }
          });
      }
    );
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const user = req.body;

  const takenUsername = await User.findOne({
    username: user.username.toLowerCase(),
  });

  const validationError = registrationValidation(user).error;

  if (validationError) {
    return res.json({ message: validationError.details[0].message });
  } else if (takenUsername) {
    return res.json({ message: "Username has already been taken" });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new User({
      username: user.username.toLowerCase(),
      password: user.password,
      email: user.email,
    });

    dbUser.save();
    return res.json({ message: "Success" });
  }
});

module.exports = router;
