const ejs = require('ejs');
let pdf = require("html-pdf");
let path = require("path");
const Logger = require('../config/winston');
const logger = new Logger('app');
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
const fs = require("fs");

const createInvoicePdf = (orderid) => {
    ejs.renderFile(path.join(__dirname, '../../emailTemplates/invoiceHTML', "index.ejs"), { students: "" }, (err, data) => {
        if (err) {
            logger.error('Error while rendering invoice ejs '+err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            };
            pdf.create(data, options).toFile(`${__dirname}/../../invoices/${orderid}.pdf`, function (err, data) {
                if (err) {
                    logger.error("Error creating PDF "+err);
                } else {
                    logger.info("PDF created successfully! "+orderid+'.pdf');
                    pathToAttachment = `${__dirname}/../../invoices/${orderid}.pdf`;
                    var attachment = fs.readFileSync(pathToAttachment).toString("base64");
                    sendMail(attachment);
                }
            });
        }
    });
}

const sendMail = (attachment) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'choudharypravesh03@gmail.com',
        from: 'pravesh.choudhary@publicissapient.com',
        subject: 'Yo yo yo yo pdf',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<h1>YO YO YO YO YO</h1>',
        attachments: [
            {
              content: attachment,
              filename: "attachment.pdf",
              type: "application/pdf",
              disposition: "attachment"
            }
          ]
        };
    sgMail.send(msg).then(() => {
        logger.info('Invoice sent to...')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
}



module.exports = createInvoicePdf;