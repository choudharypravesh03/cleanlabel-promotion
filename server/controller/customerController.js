//Import the dependencies
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
//Creating a Router
var router = express.Router();
//Link
const Customer = mongoose.model('Customer');

//Router Controller for READ request
router.get('/get', (req, res) => {
    const phone = req.query.phone;
    const email = req.query.email;
    console.log(phone, email);
    Customer.findOne({ $or:[ {'phone':phone}, {'email':email} ]}, function(err,doc) { 
        if (!err) {
           res.send(doc);
        }
        else {
            console.log('Error during record insertion : ' + err);
            res.send(err);
        }
    });
});

//Router Controller for UPDATE request
router.post('/save', (req, res) => {
    var query = { email: req.body.email },
    data = req.body,
    options = { upsert: true, new: true, rawResult:true, setDefaultsOnInsert: true };

    Customer.findOneAndUpdate(query, data, options, (err, doc) => {
        if (!err) {
            var response = {
                isUpdated: doc.lastErrorObject.updatedExisting,
                membership: doc.value.membership
            }
            res.status(200).send(response); 
        }
        else {
            console.log('Error during updating the record: ' + err);
        }
    });
});

//Router to retrieve the complete list of available Customers
router.get('/list', (req, res) => {
    Customer.find((err, docs) => {
        if (!err) {
            res.send(JSON.stringify(docs))
        }
        else {
            console.log('Failed to retrieve the Customer List: ' + err);
        }
    });
});

//Creating a function to implement input validations
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['customerNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/trackinvites', (req, res) => {
    const data = req.query;
    Customer.findOne(data, function(err,doc) { 
        if (!err) {
            if(doc !== null) {
                var subscriber_id = doc.subscriber_id;
                var invitedEmails;
                doc.sentEmails.length > 0 ? invitedEmails = doc.sentEmails.split(',').map(item => item.trim()) : invitedEmails = "";
                getReferrals(subscriber_id, invitedEmails, function(earned, pending) {
                    var obj = {
                        earned: earned,
                        pending: pending
                    }
                    res.send(obj);
                });
            } else res.send(null);
        }
        else {
            console.log('Error during record insertion : ' + err);
            res.send(err);
        }
    });
})

//Router to update a Customer using it's ID
router.get('/:id', (req, res) => {
    Customer.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("customer/customerAddEdit", {
                viewTitle: "Update Customer Details",
                customer: doc
            });
        }
    });
});

//Router Controller for DELETE request
router.get('/delete/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/customer/list');
        }
        else { console.log('Failed to Delete Customer Details: ' + err); }
    });
});



function getReferrals(subscriber_id, invitedmails, callback) {
    var query = {
        api_token: '9dd07fa2dc19443a73526ad6caa6a65f0e630797'
    }
    axios.get(`https://app.referralhero.com/api/v2/lists/MF51efecef56/subscribers/${subscriber_id}/referred`, {
        params: query
    })
      .then(response => {
        if(response.status == 200) {
            var successfulReferrals = response.data.data.subscribers.map(item => item.email);
            var unsuccessfulReferrals = invitedmails.length > 0 ? invitedmails.filter(value => !successfulReferrals.includes(value)) : "";
            callback(successfulReferrals, unsuccessfulReferrals);
        }
      })
      .catch(error => {
        console.log(error);
      })
}

module.exports = router;