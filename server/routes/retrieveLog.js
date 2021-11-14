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

router.route('/retrieveLog').post((req, res) => {

  const file = "../server/uploads/watcher.log";

  const path = require('path');

  const downloadParams = {
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

    
  })
});


module.exports = router;