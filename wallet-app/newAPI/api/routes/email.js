// Using nodemailer for sending mails
const nodemailer = require('nodemailer');
// Using express
const express = require('express');
const router = express.Router();
// Posting the email based on email id
router.post('/:email', (req, res, next) => {
const to = req.body.to;
 const subject = req.body.subject;
const text = req.body.text;
// Transporting the email using nodemailer having user and password
 var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'meancoders4@gmail.com',
          pass: 'meancoders444',
        }
      });
// These mailing options for our application
      var mailOptions = {
        from: 'meancoders4@gmail.com',
        to: to,
        subject: subject,
        text: text,
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});

 module.exports = router;
