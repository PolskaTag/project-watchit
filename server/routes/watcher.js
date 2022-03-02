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
  User.findOne({ username: req.params.userId }).then(
    (user) => {
      res.json(user.watcher);
    },
    (err) => {
      console.log(err);
    }
  );
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

  watcher._id === "" ? delete watcher._id : null;

  // cast _id to ObjectId(_id)
  watcher.udaList.forEach((uda) => {
    uda._id === "" ? delete uda._id : null;
  });

  console.log(watcher);
  User.findById(req.params.userId).then(
    (dbUser) => {
      try {
        dbUser.watcher.push(watcher);
      } catch (err) {
        console.log(err);
      }
      dbUser.save((err, data) => {
        console.log(err);
      });
      res.json({ message: "success", watcher: dbUser.watcher });
    },
    (err) => {
      console.log(err);
    }
  );
});

// update a watcher
router.route("/watchers/:userId/:watcherId").post(verifyJWT, (req, res) => {
  const updatedWatcher = req.body;
  let myquery = { _id: ObjectId(req.params.userId) };
  let newValues = {
    $set: {
      "watcher.$": updatedWatcher,
    },
  };
  User.updateOne(myquery, newValues, function (err, data) {
    if (err) throw err;
    console.log("1 document updated User: " + req.params.userId);
    res.json(data);
  });
});

// delete a watcher
router
  .route("/watchers/:userId/:watcherId/delete")
  .delete(verifyJWT, (req, res) => {
    const id = ObjectId(req.params.watcherId);
    User.findById(req.params.userId).then((dbUser) => {
      dbUser.watcher.pull(id);
      dbUser.save((err, data) => {
        if (err) console.log(err);
        res.json(data);
      });
    });
  });

module.exports = router;
