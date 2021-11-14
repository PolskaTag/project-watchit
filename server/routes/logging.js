require("dotenv").config({ path: "../config.env" });
const { uploadFile } = require("../s3");
const express = require("express");
const router = express.Router();
const fs = require('fs');

//here
const multer = require("multer");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const S3 = require("aws-sdk/clients/s3");
const verifyJWT = require("../verifyJWT");
const User = require("../models/user");
const { rejects } = require("assert");
const { resolve } = require("path");
const upload = multer({ dest: "uploads/" });

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
//to here

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});


const initiatedTime = new Date().toLocaleString();
const initiatedStatement = 'Log initiated @ ' + initiatedTime + "\r\n";
let lineNum = 1;

try {
  const data = fs.appendFileSync('../server/uploads/watcher.log', initiatedStatement)
  //file written successfully
} catch (err) {
  console.error(err)
}

router.route('/logging').post((req, res) => {

  let output = lineNum + "" + "\r\n";

  if (req.body.statement == "") {
    output = "Watcher: " + req.body.watcherName + " triggered at " + Date().toLocaleString();
  }
  else {
    output = req.body.statement + " at " + Date().toLocaleString();
  }

  
  
  try {
    const data = fs.appendFileSync('../server/uploads/watcher.log', output)
    //file written successfully
  } catch (err) {
    console.error(err)
  }

  output = "";
  lineNum += 1;

  const uploadParams = {
    Bucket: bucketName,
    Key: '',
    Body: ''
  };

  const file = "../server/uploads/watcher.log";
  const fileStream = fs.createReadStream(file);
  fileStream.on('error', function(err) {
    console.log('File Error', err);
  });

  uploadParams.Body = fileStream;
  const path = require('path');
  uploadParams.Key = path.basename(file);

  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log("Error uploading", err);
    }
    if (data) {
      console.log("Upload Success", data.Location);
    }
  })

  /*const downloadParams = {
    Bucket: bucketName,
    Key: ''
  };

  downloadParams.Key = path.basename(file);

  s3.getObject(downloadParams, function(err, res) {
    if (err === null) {
       let objectData = res.Body.toString('utf-8');
       console.log(objectData);
       const homeDir = require('os').homedir();
       const desktopDir = `${homeDir}/Desktop`;
       const outputPath = desktopDir + "/watcher.log";
       console.log(desktopDir);
       fs.writeFileSync(outputPath, JSON.stringify(objectData, null, 0).replace(/\\r/g, '\r').replace(/\\n/g, '\n') , 'utf-8');
    } else {
      console.log(err);
       res.status(500).send(err);
    }

    
  })*/
});


module.exports = router;