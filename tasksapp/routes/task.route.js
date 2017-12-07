const express = require('express');
const router = express.Router();
const passport = require('passport');
const Task = require('../models/task.model');
const async = require('async');

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

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  let todaysTask;
  let latestTask;
  let overdueTask;
  let doneTask;

  let beginOfDay = new Date();
  beginOfDay.setHours(0, 0, 0, 0);
  let endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);


  async.parallel([
    // Todays tasks
    today = (callback) => {
      Task
        .find({
          user: req.user.id,
          startDate: { $lte: Date.now() },
          endDate: { $gte: Date.now() },
          done: false
        })
        .limit(10)
        .sort('-startDate')
        .then((tasks) => {
          if (tasks) {
            todaysTask = tasks;
          } else {
            todaysTask = [];
          }
          callback();
        })
        .catch((err) => {
          return callback(err);
        });
    },
    // Latest Added Tasks
    latest = (callback) => {
      Task
        .find({
          user: req.user.id,
          createdDate: {
            $gte: beginOfDay,
            $lt: endOfDay
          },
          done: false
        })
        .limit(10)
        .sort('-createdDate')
        .then((tasks) => {
          if (tasks) {
            latestTask = tasks;
          } else {
            latestTask = [];
          }
          callback();
        })
        .catch((err) => {
          return callback(err);
        });
    },
    // Overdue Tasks
    overdue = (callback) => {
      Task
        .find({
          user: req.user.id,
          endDate: {
            $lt: endOfDay
          },
          done: false
        })
        .limit(10)
        .sort('endDate')
        .then((tasks) => {
          if (tasks) {
            overdueTask = tasks;
          } else {
            overdueTask = [];
          }
          callback();
        })
        .catch((err) => {
          return callback(err);
        })
    },
    // Done Tasks
    done = (callback) => {
      Task
        .find({
          user: req.user.id,
          done: true
        })
        .limit(10)
        .sort('-doneDate')
        .then((tasks) => {
          if (tasks) {
            doneTask = tasks;
          } else {
            doneTask = [];
          }
          callback();
        })
        .catch((err) => {
          return callback(err);
        })
    }
  ], (err) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Something wen\'t wrong. Please try again later.'
      });
    }

    res.json({
      success: true,
      msg: 'Data has been retrieved.',
      todaysTask: todaysTask,
      latestTask: latestTask,
      overdueTask: overdueTask,
      doneTask: doneTask
    });
  });
    
});

module.exports = router;