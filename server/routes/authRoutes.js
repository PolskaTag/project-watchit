require("dotenv").config({ path: "../config.env" });

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const verifyJWT = require("../verifyJWT");
const jwt = require("jsonwebtoken");
const { registrationValidation, loginValidation } = require("../validation");

const router = express.Router();

router.get("/isUserAuth", verifyJWT, (req, res) => {
  res.json({
    isLoggedIn: true,
    username: req.user.username,
    id: req.user.id,
  });
});

/**
 * Login route that returns a jwt token if authorized.
 *
 * req: expects @param username @param password
 *
 * @returns {message, token, username}
 */
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
                admin: dbUser.admin,
              };
              const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 86400 },
                (err, token) => {
                  return res.json({
                    message: "Success",
                    token: "Bearer " + token,
                    username: userLoggingIn.username.toLowerCase(),
                    admin: dbUser.admin,
                  
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

/**
 * Register route that POSTS a user document to the db.
 *
 * req: expects @param username @param password @param confirmPassword
 *
 * @returns {message}
 */
router.post("/register", async (req, res) => {
  // console.log(req.body);
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


router.post("/adminregister", async (req, res) => {
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
      admin: user.admin,
    });

    dbUser.save();
    return res.json({ message: "Success" });
  }
});


router.delete("/admindelete/:id", async(req, res) =>{
  const id = req.params.id;

  User.findByIdAndDelete(id).exec();
  res.send("Deleted");
  console.log("Deleted");
});

module.exports = router;
