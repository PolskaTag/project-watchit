/**
 * This file contains the URIs for UDA (User Defined Actions)
 */

const express = require("express");
const router = express.Router();
const verifyJWT = require("../verifyJWT");
const User = require("../models/user");
const Uda = require("../models/uda");
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Get all UDAs - auth required
router.route("/uda").get(verifyJWT, (req, res) => {
  User.find({ "uda.0": { $exists: 1 } }).then((dbUser) => {
    let results = [];
    dbUser.forEach((user) => {
      // console.log(user);
      results.push(user.uda);
    });
    // console.log(results);
    res.json(results);
  });
});

// Get all of a users UDAs
router.route("/uda/:userId").get(verifyJWT, (req, res) => {
  console.log(req.params.userId);
  User.findOne({ _id: new ObjectId(req.params.userId) }).then((dbUser) => {
    res.json(dbUser.uda);
  });
});

// Get one of a users UDAs
// router.route("/uda/:userId/:name").get(verifyJWT, (req,res) => {
//     User.findOne({userId: req.params.userId})
// })
// Post a uda
router.route("/uda/:userId/add").post(verifyJWT, (req, res) => {
  User.findOne({ _id: ObjectId(req.params.userId) }).then((dbUser) => {
    // console.log(dbUser);
    dbUser.uda.push({
      udaName: req.body.udaName,
      udaType: req.body.udaType,
      script: req.body.script,
      params: req.body.params,
    });
    dbUser.save((err, data) => {});
    res.json({ message: "Success" });
  });
});

// Delete one of a users UDAs
router.route("/uda/:userId/:udaId").delete(verifyJWT, (req, res) => {
  User.findOne({ _id: ObjectId(req.params.userId) }).then((dbUser) => {
    dbUser.uda.id(req.params.udaId).remove();
    dbUser.save(function (err) {
      if (err) console.log(err);
      console.log("Uda removed: " + req.params.udaId);
    });
  });
});

// Edit one of the users UDAs
router.route("/uda/edit/:userId/:udaId").post(verifyJWT, (req, res) => {
  User.findOneAndUpdate(
    { _id: ObjectId(req.params.userId) },
    req.body,
    { new: true },
    (error, doc) => {
      res.json(doc);
    }
  );
});

module.exports = router;
