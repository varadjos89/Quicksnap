const express = require('express');
const bodyParser = require('body-parser');//to extract body from request
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");//used for connecting express with node

const nodemailer = require("nodemailer");

const details = require("./details.json");


const servicemanRoutes = require('./api/routes/serviceman');
const servicerequestRoutes = require('./api/routes/servicerequest');
const userRoutes = require('./api/routes/user');
 const emailRoutes = require('./api/routes/email');
mongoose.connect(
    'mongodb://localhost:27017/quicksnap',
    {//to fix all deprecation warning
  useNewUrlParser: true
    }
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));//to use classic encoding
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET,OPTIONS');
//     if (req.method === 'OPTIONS') {
//         req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });



app.use('/serviceman', servicemanRoutes);
app.use('/servicerequests', servicerequestRoutes);
app.use('/users', userRoutes);
app.use('/emails', emailRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }

    });
});


module.exports = app;
