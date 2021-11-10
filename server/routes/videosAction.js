require("dotenv").config({ path: "../config.env" });

const express = require("express");

const router = express.Router();


router.route('/video').post((req, res) => {
    //let testAccount = await nodemailer.createTestAccount();

    let timeStamp = new Date().toLocaleString();

    console.log(req.body);

    const output = `
    <p>Watcher ${req.body.watcherName} has been triggered at ${timeStamp}</p>
    `;

    //get label from pi, if the label matches, record 10 seconds
    let udaLabel = req.body.label
    //send signal to pi to record if label matches object detection
    if udaLabel == LABELS


});

module.exports = router;
