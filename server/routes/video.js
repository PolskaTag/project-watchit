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

// An api that gets all the videos from users
router.route("/videoIDs/:username").get( (req, res) => {
  const username = req.params.username;

  // First find all the user's videos
  User.findOne({ username: username }).then((dbUser) => {
    console.log("CAME 2")
    // variable where we'll put our videos
    let results = [];
    console.log(dbUser.user)
    // for each user that in the list of users, push there videos into results
    if(dbUser.videos.length() === 0){
      results.push(dbUser.videos);
      console.log("CAME 3")

      dbUser.videos.forEach((video) => {  
        console.log("CAME 4")
        try {
          video.url = getPresignedUrl(video.name);
          console.log("CAME 5")
        } catch (e) {
          console.log(e);
        }
      });
    
    res.json(results);
    }
    else{
      console.log("There is no video in database")
      return res.json(null)
    }
  }) .catch(err => res.status(400).json('Error: '+ err + ' : value: ' + 0));
});
router.route("/vide/").get(verifyJWT, (req, res) => {
  const userId = req.params.userId;

  User.findOne({ userId: userId })
    .then((dbUser) =>
      res.json({
        username: dbUser.username,
        email: dbUser.email,
        videos: dbUser.videos,
        uda: dbUser.uda,
        message: "Success",
      })
    )
    .catch((err) =>
      res.json({
        username: "User not found",
        email: "",
        videos: [],
        uda: [],
        message: err,
      })
    );
});
module.exports = router;
