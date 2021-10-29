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


router.route("/adminupdate").post((req,res) => {
  User.findById(req.body.id)
  .then(updated => {
  updated.username = req.body.username;
  updated.admin = req.body.description;
  updated.save()
  .then(() => res.json('Exercise updated !'))
  .catch(err => res.status(400).json('Error: '+ err));
  });
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
