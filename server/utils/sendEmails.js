const ejs = require('ejs');
let path = require("path");
const Logger = require('../config/winston');
const logger = new Logger('app');
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
const fs = require("fs");

const sendEmails = (obj, callback) => {
    console.log(obj);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: obj.toEmail,
        from: 'pravesh.choudhary@publicissapient.com',
        subject: 'Invitation to Cleanlabel',
        text: 'Come join us with this link:',
        html: `<a href='${obj.referralLink}'>Click here</a>`
        };
    sgMail.send(msg).then((response) => {
        logger.info('Message sent to '+obj.toEmail);
        callback(response);
    }).catch((error) => {
        logger.error("Error sending email to "+obj.toEmail+ " -> ERROR: "+error);
        callback(error);
    })
}



module.exports = sendEmails;