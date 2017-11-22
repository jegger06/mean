const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('../models/User');

// Register Route
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        res.json({
          success: true,
          msg: 'User Registered. ' + user
        });
      }).catch((err) => {
        res.json({
          success: false,
          msg: 'Failed to register user.'
        });
      });
    });
  });

  // Other Way
  // User.addUser(newUser, (err, user) => {
  //   if (err) {
  //     res.json({success: false, msg: 'Failed to register user.'});
  //   } else {
  //     res.json({success: true, msg: 'User registered.'});
  //   }
  // });
});

// Authenticate Route
router.post('/authenticate', (req, res, next) => {
  res.send('AUTHENTICATE');
});

// Profile Route
router.get('/profile', (req, res, next) => {
  res.send('PROFILE');
});

module.exports = router;