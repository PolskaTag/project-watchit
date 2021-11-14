const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const verifyJWT = require("../verifyJWT");
const User = require("../models/user");
const upload = multer({ dest: "uploads/" });
const { uploadFile } = require("../s3");

router.get("/api/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.post("/api/images", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log("req file: " + req.file);
  //console.log('Current directory: ' + process.cwd());
  console.log("File uploaded from the frontend");
  console.log("File is: " + file);
  let result;

  // Try uploading the file to s3
  try {
    result = await uploadFile(file);
  } catch (e) {
    console.log(e);
  }

  // Delete the uploaded file from server directory once uploaded to s3
  try {
    await unlinkFile(file.path);
  } catch (e) {
    console.log(e);
  }

  console.log("Here are the results of uploadFile");
  console.log(result);
  //   console.log(res);
  const description = req.body.description;
  res.send({ imagePath: `/images/${result.Key}` });
});

module.exports = router;
