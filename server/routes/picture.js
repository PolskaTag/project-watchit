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
      user.pictures.forEach((picture) => {
        try {
          picture.url = getPresignedUrl(picture.name);
        } catch (e) {
          console.log(e);
        }
      });
    });
    res.json(results);
  });
});


// An api that gets all the pictures from users
router.route("/pics/:username").get(verifyJWT, (req, res) => {
  const username = req.params.username;
  console.log("CAME 1" + username)
  
  // First find all the user's pictures
  User.findOne({ username: username }).then((dbUser) => {
   // console.log( dbUser)
    if(dbUser==null){
      console.log(dbUser)
      return res.json("Could not find that user, please try again...")
    }
    if(dbUser.pictures.length == 0){
      return res.json(0)
    }

    // variable where we'll put user's pictures
    let results = [];
    
    // for each picture the user has, push there pictures into results
      dbUser.pictures.forEach((video) => {  
        results.push(dbUser.pictures);
        try {
          picture.url = getPresignedUrl(picture.name);
        } catch (e) {
          console.log(e);
        }
      });
    
    res.json(results);
    
  }) .catch(err => res.status(400).json('Error: '+ err + ' : value: ' + 0));
});

module.exports = router;
