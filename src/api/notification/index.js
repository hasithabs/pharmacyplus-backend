
var Notification = require('./model.js');
var Drug = require('../stock/model.js');

import { Router } from 'express'

const router = new Router()


var errorMsg = "";

/* GET ALL NOTIFICATIONS */
router.get('/', function(req, res, next) {
  Notification.find(function (err, results) {
    if (err) return next(err);
    res.json({status: 200, content: results});
  });
});

/* GET ALL UNSEEN NOTIFICATION */
router.get('/unseen', function(req, res, next) {
  Notification.find({seen: false}, function (err, results) {
    if (err) return next(err);
    res.json({status: 200, content: results});
  });
});

/* GET SINGLE NOTIFICATION BY ID */
router.get('/:id', function(req, res, next) {
  Notification.find({id: req.params.id}, function (err, results) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: results});
  });
});

/* SAVE NOTIFICATION */
router.post('/', function(req, res, next) {
  Notification.findOne().sort({id:-1}).exec(function (err, resultMaxId) {
    if (resultMaxId == null || resultMaxId.length == 0) {
      req.body.id = 1;
    } else {
      req.body.id = resultMaxId.id + 1;
    }

    Drug.find({id: req.body.stock}, function (err, postStock) {
      if (err || postStock.length == 0) {
        res.status(400).json({status: 400, error: "invalid stock id - " + req.body.stock});
        return next(err);
      }
      req.body.stock = {id: postStock[0].id, name: postStock[0].name};

      Notification.create(req.body, function (err, results) {
        if (err) {
          for (var prop in err.errors) {
            if (err.errors.hasOwnProperty(prop)) {
              errorMsg += err.errors[prop] + " ";
            }
          }
          res.status(400).json({error: errorMsg});
          return next(err);
        }
        res.json({status: 201, content: results});
      });
    });
  });

});

/* UPDATE NOTIFICATION */
router.put('/:id', function(req, res, next) {
  Notification.findOneAndUpdate({id: req.params.id}, req.body, function (err, results) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: results});
  });
});

/* UPDATE NOTIFICATION SEEN */
router.put('/seen/:id', function(req, res, next) {
  Notification.findOneAndUpdate({id: req.params.id}, {$set: {seen: true}}, {new: true}, function (err, results) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: results});
  });
});

/* DELETE NOTIFICATION */
router.delete('/:id', function(req, res, next) {
  Notification.findOneAndRemove({id: req.params.id}, req.body, function (err, results) {
    if (err) return next(err);
    res.json({status: 200, content: results});
  });
});

module.exports = router;