require("dotenv").config({ path: "../config.env" });
const { uploadFile } = require("../s3");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const downloadsFolder = require('downloads-folder');
//var popup = require('popups');
//const hbs = require('handlebars');


//here
const multer = require("multer");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const S3 = require("aws-sdk/clients/s3");
const verifyJWT = require("../verifyJWT");
const User = require("../models/user");
const { rejects } = require("assert");
const { resolve } = require("path");
const { addListener } = require("process");
const { string } = require("joi");
const upload = multer({ dest: "uploads/" });

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
//to here

let pathId = "test";
//let theStuff = "test";

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

router.route('/retrieveLog').post((req, res) => {

  const file = "../server/uploads/" + req.body.identifier + "watcher.log";
  //console.log("1 " + req.body.identifier);
  const path = require('path');
  pathId = req.body.identifier;

  const downloadParams = {
    Bucket: bucketName,
    Key: ''
  };

  downloadParams.Key = path.basename(file);

  s3.getObject(downloadParams, function(err, res) {
    if (err === null) {
       let objectData = res.Body.toString('utf-8');
       //theStuff = objectData;
       //console.log(objectData);
       const homeDir = require('os').homedir();
       const desktopDir = `${homeDir}/Desktop`;
       const outputPath = downloadsFolder() + "/watcher.log";
       const frontPath =
       //console.log(outputPath);
       fs.writeFileSync(outputPath, JSON.stringify(objectData, null, 0).replace(/\\r/g, '\r').replace(/\\n/g, '\n') , 'utf-8');
    } else {
      console.log(err);
       res.status(500).send(err);
    }
  })

});

router.route('/retrieveLog/please').get((req, res) => {
  //console.log("oh my god it's getting");
  setTimeout(()=>{
    resolve();
;} , 5000
);


  const file = "../server/uploads/" + pathId + "watcher.log";
  //console.log("File: " + file);
  const path = require('path');

  const downloadParams = {
    Bucket: bucketName,
    Key: ''
  };

  //console.log("heres the stuff: " + theStuff);

  downloadParams.Key = path.basename(file);

  let objectData = fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return
    }
    //data.set('Content-Type', 'text/html');

    let temp = data;
/*
    for (let i = 0; i < temp.length; i++) {
      //console.log(i);
      if (temp[i] === ')') {
        console.log("bing!");
        //data[i].replace(data[i], "<br>");
        //temp[i].replace(')', '<br>');
        temp.replace(temp[i], "@");
        //console.log(temp);
      }
    }

    console.log("THIS IS TEMP: " + temp);
*/  
    let cleanedData = data;
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(cleanedData));
  });

});

module.exports = router;