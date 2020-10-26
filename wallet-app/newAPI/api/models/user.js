'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining the schema for a user(customer) object

let UserSchema = new Schema({

    firstname: {
        type: String,
        required: " First Name should be entered"
    },

    lastname: {
        type: String,
        required: " Last Name should be entered"
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
        required: ' password cannot be empty'
    },

	}, {
    versionKey: false

});

// email valiation before saving to DB

UserSchema.path('email').validate((value)=>
{
  let emailIdR=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailIdR.test(value);
},'invalid email id');

module.exports = mongoose.model('user', UserSchema);
