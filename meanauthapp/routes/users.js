const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('../models/User');
const keys = require('../config/keys');

// Register Route
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        res.json({
          success: true,
          msg: 'User Registered.'
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
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}).then((user) => {
    if (!user) {
      return res.json({success: false, msg: 'User not found.'});
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign(user.toJSON(), keys.secret, {
          expiresIn: 604800 // 1 week in seconds
        });

        res.json({
          success: true,
          token: 'Bearer ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
    
  }).catch((err) => {
    console.log('Error on finding user: ', err);
  });
});

// Profile Route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;