require("dotenv").config({ path: "../config.env" });
const express = require("express");
const router = express.Router();
const fs = require('fs');

/*
const initiatedTime = new Date().toLocaleString();
const initiatedStatement = 'Log initiated @ ' + initiatedTime;

try {
  const data = fs.writeFileSync('/Users/jacobtaylor/Desktop/test.txt', initiatedStatement)
  //file written successfully
} catch (err) {
  console.error(err)
}
*/

const initiatedTime = new Date().toLocaleString();
const initiatedStatement = 'Log initiated @ ' + initiatedTime;

try {
  const data = fs.writeFileSync('/Users/jacobtaylor/Desktop/log0.txt', initiatedStatement)
  //file written successfully
} catch (err) {
  console.error(err)
}

router.route('/logging').post((req, res) => {
  const initiatedTime1 = new Date().toLocaleString();
  const initiatedStatement1 = 'Log initiated @ ' + initiatedTime1;
  
  try {
    const data = fs.writeFileSync('/Users/jacobtaylor/Desktop/log1.txt', initiatedStatement1)
    //file written successfully
  } catch (err) {
    console.error(err)
  }
});

module.exports = router;