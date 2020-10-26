const express = require('express')
const router = express.Router()
const mangoose = require('mongoose')
const serviceman = require('../models/serviceman')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// get function to get a specific serviceprovider by their ID
router.get('/:Id', (req, res, next) => {
  const Id = req.params.Id
  serviceman
  .findOne({ _id: Id })
  .then(u => {
    if (!u) {
      return res.json({
        msg: 'User not found'
      });
    }
    fetchedUser = u;
    return res.status(200).json({
      userid: fetchedUser._id,
      firstname: fetchedUser.firstname,
      lastname: fetchedUser.lastname,
      address: fetchedUser.address,
      email: fetchedUser.email,
      city: fetchedUser.city,
      zipcode: fetchedUser.zipcode,
      profession: fetchedUser.profession
    });
  }).catch(err => {
    return res.status(401).json({
      msg: 'Invalid User'
    })
  });
})

// get function to get a specific serviceprovider by their city name and profession
router.get('/:city/:profession', (req, res, next) => {
  const profession = req.params.profession
  const city = req.params.city
  serviceman
    .find({ profession: profession, city: city })
    .exec()
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

// get function to get a specific serviceprovider by their emailID and password
router.get('/login/:email/:password', (req, res, next) => {
  const Id = req.params.email
  const pwd = req.params.password
  let fetchedUser
  serviceman
    .findOne({
      email: Id
    })
    .then(u => {
      if (!u) {
        return res.json({
          msg: 'User not found'
        })
      }
      fetchedUser = u
      return bcrypt.compare(pwd, u.password)
    })
    .then(result => {
      if (!result) {
        return res.json({
          msg: 'Invalid User'
        })
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userID: fetchedUser._id
        },
        'secret_this_should_be_long',
        {
          expiresIn: '1h'
        }
      )
      res.status(200).json({
        token: token,
        fetchedUser: fetchedUser,
        userid:fetchedUser._id
      })
    })
    .catch(err => {
      return res.status(401).json({
        msg: 'Authentication Failed'
      })
    })
    .catch(err => {
      return res.status(401).json({
        msg: 'Invalid User'
      })
    })
})

// get function to get all the serviceproviders
router.get('/', (req, res, next) => {
  serviceman
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

// post function to post a specific serviceprovider to the database
router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const person = new serviceman({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      profession: req.body.profession,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      zipcode: req.body.zipcode,
      password: hash
    })
    person
      .save((err, u) => {
        if (err) {
          res.json({
            msg: 'Fail'
          })
        } else {
          res.json({
            msg: 'Success'
          })
        }
      })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
    res.status(201).json({
      message: 'Handling post requests to /user'
    })
  })
})

// PUT function to update a specific serviceprovider by their ID
router.put('/:Id', (req, res, next) => {
  const Id = req.params.Id
  bcrypt.hash(req.body.password, 10).then(hash => {
    serviceman
      .updateOne(
        { _id: Id },
        {
          $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            profession: req.body.profession,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            zipcode: req.body.zipcode,
            password: hash
          }
        }
      )
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
    res.status(201).json({
      message: 'Handling PUT requests to /serviceman',
    });
  });
});

// dalete function to delete a specific serviceprovider by their ID
router.delete('/:Id', (req, res, next) => {
  const Id = req.params.Id

  serviceman
    .remove({ _id: Id })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router
