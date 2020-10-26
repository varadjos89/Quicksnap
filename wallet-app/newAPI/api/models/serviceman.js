'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining the schema for a serviceprovider object
let ServicemanSchema = new Schema({

    firstname: {
        type: String,
        required: " First Name should be entered"
    },

    lastname: {
        type: String,
        required: " Last Name should be entered"
    },

    profession: {
        type: String,
        required: " required"
    },

    email: {
        type: String,
        unique:true,
        required: " Email should be entered"

    },

    address: {
        type: String,
        required: " required"
    },

    city:{
        type: String,
        required: " required"
    },

    zipcode:{
        type: String,
        required: " required"
    },
    password:{
        type: String,
        minlength:[5,'password should be of length of minimum length 5'],
        required: ' password should not be left empty'
    },

	}, {
    versionKey: false

});

// the email is validated here before saving in the database
ServicemanSchema.path('email').validate((value)=>
{
  let emailIdR=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailIdR.test(value);
},'invalid email id');

module.exports = mongoose.model('serviceman', ServicemanSchema);
