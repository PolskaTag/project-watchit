const express = require("express");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
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

router.route("/uda/:userId").get(verifyJTW, (req, res) => {
  const userId = req.params.userId;

  User.findOne({ userId: userId })
    .then((dbUser) =>
      res.json({
        uda: dbUser.uda,
        message: "Success",
      })
    )
    .catch((err) =>
      res.json({
        uda: [],
        message: err,
      })
    );
});

router.route("/updateUserInfo").post(verifyJWT, (req, res) => {
  User.updateOne({ username: req.user.username });
});

module.exports = router;
