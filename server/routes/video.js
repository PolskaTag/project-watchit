require("dotenv").config({ path: "../config.env" });
const { getPresignedUrl } = require("../s3");

const express = require("express");
const User = require("../models/user");
const verifyJWT = require("../verifyJWT");
const jwt = require("jsonwebtoken");
const { registrationValidation, loginValidation } = require("../validation");
const { route } = require("./authRoutes");

const router = express.Router();

// An api that gets all the videos from users
router.route("/videos").get(verifyJWT, (req, res) => {
  // First find all the users with videos
  User.find({ "videos.0": { $exists: 1 } }).then((dbUser) => {
    // variable where we'll put our videos
    let results = [];
    // for each user that in the list of users, push there videos into results
    dbUser.forEach((user) => {
      results.push(user.videos);
      user.videos.forEach((video) => {
        try {
          video.url = getPresignedUrl(video.name);
        } catch (e) {
          console.log(e);
        }
      });
    });
    res.json(results);
  });
});

module.exports = router;
