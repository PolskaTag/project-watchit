require("dotenv").config({ path: "../config.env" });

const express = require("express");

const router = express.Router();
const nodemailer = require("nodemailer");



router.route('/notification').post((req, res) => {
    //let testAccount = await nodemailer.createTestAccount();

    let timeStamp = new Date().toLocaleString();

    console.log(req.body);

    const output = `
    <p>Watcher ${req.body.watcherName} has been triggered at ${timeStamp}</p>
    `;

    //let sendTo = 

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'watchitalerts@gmail.com',
            pass: 'xodmoc-megbEj-4wusmi', 
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info =  transporter.sendMail({
        from: 'watchitalerts@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "WatchIT Alert Notification", // Subject line
        text: "Text!", // plain text body
        html: output // html body
    });

    transporter.sendMail(info, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    })

    //res.json({ message: "Success" });

    //console.log("Message sent: %s", info.messageId);


    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

module.exports = router;
