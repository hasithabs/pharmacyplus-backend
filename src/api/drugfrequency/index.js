
var Drugfrequency = require('./model.js');

import { Router } from 'express'

const router = new Router()


var errorMsg = "";

/* GET ALL DRUGFREQUENCYS */
router.get('/', function(req, res, next) {
  Drugfrequency.find(function (err, products) {
    if (err) return next(err);
    res.json({status: 200, content: products});
  });
});

/* GET SINGLE DRUGFREQUENCY BY ID */
router.get('/:id', function(req, res, next) {
  Drugfrequency.findOne({id: req.params.id}, function (err, post) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: post});
  });
});

/* SAVE DRUGFREQUENCY */
router.post('/', function(req, res, next) {
  Drugfrequency.findOne().sort({id:-1}).exec(function (err, resultMaxId) {
    req.body.id = resultMaxId.id + 1;
    Drugfrequency.create(req.body, function (err, post) {
      if (err) {
        for (var prop in err.errors) {
          if (err.errors.hasOwnProperty(prop)) {
            errorMsg += err.errors[prop] + " ";
          }
        }
        res.status(400).json({error: errorMsg});
        return next(err);
      }
      res.json({status: 200, content: post});
    });
  });
});

/* UPDATE DRUGFREQUENCY */
router.put('/:id', function(req, res, next) {
  Drugfrequency.findOneAndUpdate({id: req.params.id}, req.body, function (err, post) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: post});
  });
});

/* DELETE DRUGFREQUENCY */
router.delete('/:id', function(req, res, next) {
  Drugfrequency.findOneAndRemove({id: req.params.id}, req.body, function (err, post) {
    if (err) return next(err);
    res.json({status: 200, content: post});
  });
});

module.exports = router;