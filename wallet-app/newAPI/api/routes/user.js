const express = require('express')
const router = express.Router()
const mangoose = require('mongoose')
const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// GET function to get a specific user using his ID
router.get('/:id', (req, res, next) => {
  const Id = req.params.id;
  let fetchedUser;
  user
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
        zipcode: fetchedUser.zipcode
      });
    }).catch(err => {
      return res.status(401).json({
        msg: 'Invalid User'
      })
    });
})


// GET function to get all the users by their username

router.get('/username/:username', (req, res, next) => {
  const Id = req.params.Id
  user
    .find({ username: Id })
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


// GET function to get one user based on his emailID and his password used for login

router.get('/login/:email/:password', (req, res, next) => {
  let fetchedUser;
  user.findOne({
    email: req.params.email
  }).then(u => {
    if (!u) {
      return res.json({
        msg: 'User not found'
      });
    }
    fetchedUser = u;
    return bcrypt.compare(req.params.password, u.password);
  }).then(result => {
    if (!result) {
      return res.json({
        msg: 'Invalid User'
      });
    }
    const token = jwt.sign({
      email: fetchedUser.email,
      userID: fetchedUser._id,
    }, 'secret_this_should_be_long', {
        expiresIn: '1h'
      });
    res.status(200).json({
      token: token,
      fetchedUser: fetchedUser,
      userid: fetchedUser._id
    });
  }).catch(err => {
    return res.status(401).json({
      msg: 'Authentication Failed'
    });
  }).catch(err => {
    return res.status(401).json({
      msg: 'Invalid User'
    })
  });
})


// GET function to get all the users
router.get('/', (req, res, next) => {
  user
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

// POST function to create a new users
router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const newu = new user({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      zipcode: req.body.zipcode,
      password: hash
    })

    newu.save((err, u) => {
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

// PUT function to update all the attributes of a specific user found by his _id
router.put('/:Id', (req, res, next) => {

  bcrypt.hash(req.body.password, 10).then(hash => {
    const Id = req.params.Id
    user
      .updateOne(
        { _id: Id },
        {
          $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
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

// DELETE function to delete a specific users
router.delete("/:Id", (req, res, next) => {
  const Id = req.params.Id;

  user.remove({ _id: Id })
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