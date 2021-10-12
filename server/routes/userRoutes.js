const express = require("express");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
const verifyJWT = require("../verifyJWT");
const User = require("../models/user");

router.route("/u/:userId").get(verifyJWT, (req, res) => {
  const username = req.params.userId;

  User.findOne({ username: username })
    .then((dbUser) =>
      res.json({
        username: dbUser.username,
        email: dbUser.email,
      })
    )
    .catch((err) =>
      res.json({
        username: "User not found",
        email: "",
      })
    );
});

router.route("/updateUserInfo").post(verifyJWT, (req, res) => {
  User.updateOne({ username: req.user.username });
});

module.exports = router;
