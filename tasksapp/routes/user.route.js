const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const keys = require('../config/keys');

router.post('/register', (req, res) => {
  // check if email is unique
  let email = req.body.email;
  User.findOne({email: email}).then((user) => {
    if (user) {
      console.log('Email is not available');
      res.json({
        success: false,
        msg: 'Email is already in use.'
      });
    } else {
      let newUser = new User({
        username: req.body.username,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // Change the raw password to hash
          newUser.password = hash;
          // Save user to db
          newUser.save().then((user) => {
            res.json({
              success: true,
              msg: 'User Registered'
            });
            console.log(user);
          }).catch((err) => {
            res.json({
              success: false,
              msg: 'Failed to save user in db. Please try again later.'
            });
          });
        });
      });

    }
    
  }).catch((err) => {
    res.json({
      success: false,
      msg: 'Failed to register user. Please check all the fields and try again.'
    });
  });
  
});

router.post('/authenticate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if username is existing in db
  User.findOne({username: username}).then((user) => {
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found.'
      });
    }

    // username is correct. check if password is match
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign(user.toJSON(), keys.secret, {
          expiresIn: 3600 // 1 hour in seconds
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            name: `${user.firstname} ${user.lastname}`,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({
          success: false,
          msg: 'Password incorrect, please check your username and password.'
        });
      }
    });
  }).catch((err) => {
    res.json({
      success: false,
      msg: 'Failed to find the user in db. Please try again later.'
    })
  })
});

router.post('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

module.exports = router;