'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining the schema for a service request object
let ContactSchema = new Schema({
  
    userId: {
        type: String,
        required: " required"
    },
    username: {
        type: String,
        required: " required"
    },
    servicemanId: {
        type: String,
        required: " required"
    },
	servicemanname: {
        type: String,
        required: " required"
    },
    budget: {
        type: String,
        required: " required"
    },
    
    deadline: {
        type: String,
        required: " required"
    },
     
    description:{
        type: String,
        required: " required"
    },

    status:{
        type: String,
        default: 'pending'
    }

    // add user and service provider name
	}, {
    versionKey: false
	
});



module.exports = mongoose.model('requests', ContactSchema);