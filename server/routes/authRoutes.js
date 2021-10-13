const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const verifyJWT = require("../verifyJWT");
const jwt = require("jsonwebtoken");
const { registrationValidation, loginValidation } = require("../validation");

const router = express.Router();

router.route("/isUserAuth").get(verifyJWT, (req, res) => {
  return res.json({ isLoggedIn: true, username: req.user.username });
});

router.route("/login").post((req, res) => {
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
              jwt.sign(
                payload,
                process.env.PASSPORTSECRET,
                { expiresIn: 86400 },
                (err, token) => {
                  return res.json({
                    message: "Success",
                    token: "Bearer " + token,
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
  console.log(req);
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
