const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/customer-data';

console.log(process.env.MONGODB_URI);

// Connecting to the database
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//Connecting Node and MongoDB
require('./customer.model');