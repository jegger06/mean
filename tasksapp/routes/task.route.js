const express = require('express');
const router = express.Router();
const passport = require('passport');
const Task = require('../models/task.model');

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const task = new Task({
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    details: req.body.details,
    user: req.user.id
  });
  task.save().then((task) => {
    if (task) {
      res.json({
        'success': true,
        'msg': 'Task has been added.',
        'data': task
      });
    } else {
      res.json({
        'success': false,
        'msg': 'Task has not yet been retrieved.'
      });
    }
  }).catch((err) => {
    res.json({
      'success': false,
      'msg': 'There has been an error saving. Please check all fields and try again.'
    });
  });
});

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  Task.find({
    user: req.user.id
  })
    .populate('user')
    .then((tasks) => {
      res.json({
        'success': true,
        'msg': 'All tasks',
        'data': tasks
      });
    })
    .catch((err) => {
      res.json({
        'success': false,
        'msg': 'Something wen\'t wrong. Please try again later.'
      });
    });

});

module.exports = router;