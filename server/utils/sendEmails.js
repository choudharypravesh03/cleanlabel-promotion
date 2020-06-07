const ejs = require('ejs');
let path = require("path");
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
const fs = require("fs");

const sendEmails = (obj) => {
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
        if(response[0].statusCode === '202') {
            console.log('Message sent');
        } else {
            console.log("Message not sent");
        }
    }).catch((error) => {
        console.log(error)
    })
}



module.exports = sendEmails;