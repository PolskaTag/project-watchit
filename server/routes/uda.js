/**
 * This file contains the URIs for UDA (User Defined Actions)
 */

const express = require("express");
const router = express.Router();
const verifyJWT = require("../verifyJWT");
const User = require("../models/user");
const Uda = require("../models/uda");
const { db } = require("../models/user");

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
  User.findOne({ userId: req.params.userId }).then((dbUser) => {
    res.json(dbUser.uda);
  });
});

// Get one of a users UDAs
// router.route("/uda/:userId/:name").get(verifyJWT, (req,res) => {
//     User.findOne({userId: req.params.userId})
// })

// Post a uda
router.route("/uda/:userId/add").post(verifyJWT, (req, res) => {
  User.findOne({ userId: req.params.userId }).then((dbUser) => {
    // console.log(dbUser);
    dbUser.uda.push({
      udaName: req.body.udaName,
      script: req.body.script,
      params: req.body.params,
    });
    dbUser.save((err, data) => {});
    res.json({ message: "Success" });
  });
});

// Delete one of a users UDAs
router.route("/uda/:userId/:udaId").delete(verifyJWT, (req, res) => {
  User.findOne({ userId: req.params.userId }).then((dbUser) => {
    dbUser.uda.id(req.params.udaId).remove();
    dbUser.save(function (err) {
      if (err) console.log(err);
      console.log("Uda removed");
    });
  });
});

// Edit one of the users UDAs
// router.route("/uda/update/:udaId").post(verifyJWT, (req, res) => {
//     let updatedUda = {
//         udaName: req.body.udaName,
//         script: req.body.script,
//         params: req.body.params
//     };

//     User.findOne({userId: req.params.userId}).then()

// })

//get details of a uda
router.route("/uda/:userId").get(verifyJWT, (req,res) => {
  User.findOne({userId: req.params.userId}).then((dbUser) => {
    dbUser.uda.get({
      udaName: req.body.udaName,
      script: req.body.script,
      params: req.body.params,
    });
    res.json(dbUser.uda);
  })
});

module.exports = router;
