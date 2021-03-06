require("dotenv").config({ path: "./config.env" });
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const { url } = require("inspector");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

function getPresignedUrl(key) {
  return s3.getSignedUrl("getObject", {
    Bucket: bucketName,
    Key: key,
    Expires: 3000,
  });
}
exports.getPresignedUrl = getPresignedUrl;

// upload a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
