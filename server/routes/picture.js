require("dotenv").config({ path: "../config.env" });
const { getPresignedUrl } = require("../s3");

const express = require("express");
const User = require("../models/user");
const verifyJWT = require("../verifyJWT");
const jwt = require("jsonwebtoken");
const { registrationValidation, loginValidation } = require("../validation");
const { route } = require("./authRoutes");

const router = express.Router();

// An api that gets all the pictures from users
router.route("/pictures").get(verifyJWT, (req, res) => {
  // First find all the users with pictures
  User.find({ "pictures.0": { $exists: 1 } }).then((dbUser) => {
    // variable where we'll put our pictures
    let results = [];
    // for each user that in the list of users, push there pictures into results
    dbUser.forEach((user) => {
      results.push(user.pictures);
     /* user.pictures.forEach((picture) => {
        try {
          picture.url = getPresignedUrl(picture.name);
        } catch (e) {
          console.log(e);
        }
      });*/
    });
    res.json(results);
  });
});

module.exports = router;
