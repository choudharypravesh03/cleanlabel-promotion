const mongoose = require('mongoose');

//Attributes of the Course object
var customerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    id: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    membership: {
        type: String,
        default: 'none'
    },
    city: {
        type: String
    },
    photoUrl: {
        type: String
    },
    referrerCode: {
        type: String
    },
    referral: {
        type: String
    },
    referred_by: {
        type: String
    },
    created_at: {
        type: String
    },
    order_id: {
        type: String
    },
    amount: {
        type: String
    },
    transactionStatus: {
        type: String
    },
    sentEmails : {
        type: String
    },
    subscriber_id: {
        type: String,
    }
});

module.exports = mongoose.model('Customer', customerSchema);