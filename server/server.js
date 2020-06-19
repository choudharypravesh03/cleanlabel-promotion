

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const helmet = require('helmet')
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize'); 
const Logger = require('./config/winston');
const logger = new Logger('app');

const prodEnv = {path: path.resolve(process.cwd(), '.env.production')};
const devEnv = { path: path.resolve(process.cwd(), '.env.development') };
var env = process.env.NODE_ENV === 'production' ? prodEnv : devEnv;
require("dotenv").config(env);

const PORT = process.env.PORT || 5000;
require('./model/mongodb');

const {initPayment, responsePayment} = require("./paytm/services/index");
const customerController = require('./controller/customerController');
const utilsController = require('./utils/utilsController');
const createInvoicePdf = require('./utils/utils');
const sendEmails = require('./utils/sendEmails');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/../views/"));
app.use(express.static(__dirname + "/../js/"));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use("/assets", express.static(__dirname + "/../assets"));
app.use("/css", express.static(__dirname + "/../css"));
app.use("/img", express.static(__dirname + "/../img/"));
app.set("view engine", "ejs");




app.get("/membership", (req, res) => {res.render("membership.ejs", { authData: process.env});});
app.get("/", (req, res) => {res.render("index.ejs", { authData: process.env});});
app.get("/referrals", (req, res) => {res.render("referrals.ejs", { authData: process.env});});
app.get("/account", (req, res) => {res.render('account.ejs', {authData: process.env});})
app.get("/nm_membership", (req, res) => {res.render('nonmember_membership.ejs', {authData: process.env});})
app.get("/m_membership", (req, res) => {res.render('member_membership.ejs', {authData: process.env});})
app.get("/referrals_temp", (req, res) => {res.render('referrals_temp.ejs', {authData: process.env});})

app.get("/paywithpaytm", (req, res) => {
    initPayment(req.query.amount).then(
        success => {
            logger.info('Initiated payment gateway for amount '+req.query.amount);
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: process.env.PAYTM_FINAL_URL
            });
        },
        error => {
            logger.error('Initiated payment gateway for amount '+req.query.amount+ ' failed!');
            res.send(error);
        }
    );
});

app.post("/paywithpaytmresponse", (req, res) => {
    responsePayment(req.body).then(
        response => {
            if(response.STATUS === 'TXN_SUCCESS') {
                logger.info('Transaction successful! Order ID: '+response.ORDERID)
                createInvoicePdf(response.ORDERID);
                res
                .status(200)
                .render("paymentSuccess.ejs", {
                    resultData: "true", 
                    responseData: response, 
                    baseUrl: process.env.BASE_URL,
                });
            } else {
                res
                .status(200)
                .render('paymentFailure.ejs', {resultData: "true", responseData: response});
            }
        },
        error => {
            res.send(error);
        }
    );
});

app.get('/sendmails', (req, res) => {
    var emails = req.query.emails;
    var sentCount = 0;
    var emailArray = emails.split(",").map(function(item) {
        let obj = {
            toEmail: item.trim(),
            referralLink: 'http://localhost:5000?mwr=pravesh-9a99'
        }
        return obj;
      });
    logger.info("Sending emails...");
    for(let i=0; i<emailArray.length; i++) {
        sendEmails(emailArray[i], (response) => {
            sentCount++;
            if(i === emailArray.length-1) {
                logger.info("Total emails: "+emailArray.length+" and sent emails "+sentCount);
                res.status(200).send("Successfully sent emails");
            }
        });
    }
})


app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.API_TOKEN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            })
        }
    })
})

app.post('/login', (req, res) => {
    jwt.sign({id: "AIzaSyAJaIluEqkPDwKJQW-PsUHzXR98oJlfuPU"}, process.env.API_TOKEN, { expiresIn: '1d' }, (err, token) => {
        res.json({
            token: token
        });
        // save this token in the localstorage on client
    });
})

// Verify token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is  undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space coz Authorization: Bearer <access token>
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        // Next middleware
        console.log(req.token);
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}


app.listen(PORT, () => {
    console.log("App started at port "+PORT);
});

//Set the Controller path which will be responding the user actions
app.use('/customer', customerController);
app.use('/utils', utilsController);