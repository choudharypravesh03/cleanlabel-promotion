

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
const app = express();
const path = require('path');

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
app.use("/assets", express.static(__dirname + "/../assets"));
app.use("/css", express.static(__dirname + "/../css"));
app.set("view engine", "ejs");


app.get("/paywithpaytm", (req, res) => {
    initPayment(req.query.amount).then(
        success => {
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: process.env.PAYTM_FINAL_URL
            });
        },
        error => {
            res.send(error);
        }
    );
});

app.get("/membership", (req, res) => {
    res.render("membership.ejs", { authData: process.env});
});

app.get("/", (req, res) => {
    res.render("index.ejs", { authData: process.env});
});

app.get("/referrals", (req, res) => {
    res.render("referrals.ejs", { authData: process.env});
});

app.get("/account", (req, res) => {
    res.render('account.ejs', {authData: process.env});
})

app.post("/paywithpaytmresponse", (req, res) => {
    responsePayment(req.body).then(
        response => {
            console.log(JSON.stringify(response));
            if(response.STATUS === 'TXN_SUCCESS') {
                createInvoicePdf(response.ORDERID);
                res
                .status(200)
                .render("response.ejs", {
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
    var emailArray = emails.split(",").map(function(item) {
        let obj = {
            toEmail: item.trim(),
            referralLink: 'http://localhost:5000?mwr=pravesh-9a99'
        }
        return obj;
      });
    for(let i=0; i<emailArray.length; i++) {
        sendEmails(emailArray[i]);
    }
    res.status(200).send("Successfully send emails");
})


app.listen(PORT, () => {
    console.log("Running on " + PORT);
});

//Set the Controller path which will be responding the user actions
app.use('/customer', customerController);
app.use('/utils', utilsController);