const express = require("express");
const router = express.Router();
const verifyJWT = require("../verifyJWT");
const User = require("../models/user");
const { route } = require("./authRoutes");

router.route("/u/:userId").get(verifyJWT, (req, res) => {
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

router.route("/updateUserInfo").post(verifyJWT, (req, res) => {
  User.updateOne({ username: req.user.username });
});

router.route("/adminupdate").post((req, res) => {
  const newName = req.body.username;
  const id = req.body.id;
  const admin = req.body.admin

  
   User.findById(id).then(updated =>{//, updateAdmin
      updated.name = newName;
      updated.admin = admin;
     // updateAdmin.admin = admin
      //updateAdmin.save();
      updated.save();
      res.send("updated");
    })
  .catch(err => res.status(400).json("error " + err));
   
  
});

router.route("/adminread").get(verifyJWT, (req, res) => {
  User.find({}, (err, result) =>{
    if(err){
      console.log(err);
      res.send(err);
    }
    console.log(result);
    return res.json(result);
  })
})

module.exports = router;
