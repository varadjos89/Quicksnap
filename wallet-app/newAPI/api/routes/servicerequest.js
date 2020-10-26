const express = require('express');
const router = express.Router();
const mangoose = require('mongoose');
const servicerequest = require('../models/servicerequest');


// GET function to get a specific service request by its ID
router.get('/:Id', (req, res, next) => {
    const Id = req.params.Id;
    serviceman.find({ _id : Id } )
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


// GET function to get all the service request assigned to a specific service provider using his ID
router.get('/serviceman/:servicemanId', (req, res, next) => {
   
    const SId = req.params.servicemanId;
    servicerequest.find( { servicemanId : SId })
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// GET function to get all the service request created by  a specific user using his ID
router.get('/user/:userId', (req, res, next) => {
    const UId = req.params.userId;
 
    servicerequest.find({  userId : UId })
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


// GET function to get all the service request created by all the users

router.get('/', (req, res, next) => {
   
 
    servicerequest.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


// POST function to create a new service request 
router.post('/', (req, res, next) => {

    const person = new servicerequest({

        userId: req.body.userId,
        username: req.body.username,
        servicemanId: req.body.servicemanId,
        servicemanname:req.body.servicemanname,
        budget: req.body.budget,
        deadline: req.body.deadline,
        description: req.body.description,
        status: req.body.status,
                
    });
    person.save().then((result) => {

        console.log(result)
    }).catch((err) => {
        console.log(err);
    });;
    res.status(201).json({
        message: 'Handling POST requests to /Appointments',
        person: person
    });
});


// PUT function to update the status of the service request to accept/decline/complete /paid

router.put('/:Id', (req, res, next) => {
    const Id = req.params.Id;
    servicerequest.updateOne({ _id : Id }, {
        $set:
        {
            status: req.body.status,
 
        }
    }).exec()
        .then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err);
        });
    res.status(201).json({
        message: 'Handling PUT requests to /servicerequest',
    });
});



// Delete function to delete a service request

router.delete("/:Id", (req, res, next) => {
    const Id = req.params.Id;
    
    servicerequest.remove({ _id : Id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;