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
router.route("/videoIDs/:username").get(verifyJWT, (req, res) => {
  const username = req.params.username;
  // First find all the user's videos
  User.findOne({ username: username }).then((dbUser) => {
   // console.log( dbUser)
    if(dbUser==null){
      console.log(dbUser)
      return res.json("Could not find that user, please try again...")
    }
    if(dbUser.videos.length == 0){
      return res.json(0)
    }


    // variable where we'll put user's videos
    let results = [];
    results.push(dbUser.videos);
    // for each video the user has, push there videos into results
      dbUser.videos.forEach((video) => {  
        
        try {
          video.url = getPresignedUrl(video.name);
        } catch (e) {
          console.log(e);
        }
      });
    
    res.json(results);
    
  }) .catch(err => res.status(400).json('Error: '+ err + ' : value: ' + 0));
});

  
module.exports = router;
