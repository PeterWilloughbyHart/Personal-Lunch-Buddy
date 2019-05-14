const nodemailer = require('nodemailer');

const { emailSecret } = process.env;

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "TheLunchBuddyCompany@gmail.com",
      pass: emailSecret
    }
  });
  
  function sendEmail(req, res, next) {
    let mailOptions = {
      from: "TheLunchBuddyCompany@gmail.com",
      to: req.body.email,
      subject: "Welcome, and thanks for using LunchBuddy!",
      text: "We hope you have a great lunch!"
    };
  
    transporter.sendMail(mailOptions, function(error, data) {
      if (error) {
        console.log("error occured", error);
      } else {
        console.log("successfully sent!");
      }
    });
    next()
  }
  
  module.exports = {
    sendEmail
  };