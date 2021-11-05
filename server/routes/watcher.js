const express = require("express");
const router = express.Router();
const verifyJWT = require("../verifyJWT");
const User = require("../models/user");
const Uda = require("../models/uda");
const Watcher = require("../models/watcherModel");
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const { resolveContent } = require("nodemailer/lib/shared");

// get all watchers
router.route("/watchers").get(verifyJWT, (req, res) => {
  User.find({ "watcher.0": { $exists: 1 } }).then((dbUsers) => {
    let results = [];
    // iterate through each user
    dbUsers.forEach((dbUser) => {
      // iterate over the users watchers
      dbUser.watcher.forEach((watcher) => {
        results.push(watcher);
      });
    });

    // return the results in res
    res.json(results);
  });
});

// get all users watchers
router.route("/watchers/:userId").get(verifyJWT, (req, res) => {
  // Find the user by _id
  User.findById(req.params.userId).then((user) => {
    res.json(user.watcher);
  });
});

// get specified watcher from user
router.route("/watchers/:userId/:watcherId").get(verifyJWT, (req, res) => {
  // Find the user with userId
  User.findOne({ _id: ObjectId(req.params.userId) })
    // Find the first watcher with the id === watcherId
    .elemMatch({ _id: req.params.watcherId })
    .then((watcher) => {
      console.log(watcher);
      res.json(watcher);
    });
});

// Watcher schema
// const watcherSchema = mongoose.Schema({
//   watcherName: {
//     type: String,
//     required: true,
//   },
//   ipAddress: {
//     type: String,
//     required: false,
//   },
//   object: {
//     type: String,
//     required: false,
//   },
//   udaList: [udaSchema],
//   options: {},
// });

// create a watcher
router.route("/watchers/:userId").post(verifyJWT, (req, res) => {
  const watcher = req.body;
  User.findById(req.params.userId).then((dbUser) => {
    dbUser.watcher.push(...watcher);
    dbUser.save((err, data) => {
      res.json({ err, data });
    });
  });
});

// update a watcher
router.route("/watchers/:userId/:watcherId").post(verifyJWT, (req, res) => {
  const updatedWatcher = req.body;
  User.updateOne(
    { _id: req.params.userId, "watcher.watcherId": req.params.watcherId },
    { $set: { "watcher.$": updatedWatcher } }
  ).then(
    (result) => {
      res.json(result);
    },
    (err) => {
      console.log(err);
    }
  );
});

// delete a watcher
router.route("/watchers/:userId/:watcherId").get(verifyJWT, (req, res) => {});

module.exports = router;
