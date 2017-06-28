
var Drugdosage = require('./model.js');

import { Router } from 'express'

const router = new Router()


var errorMsg = "";

/* GET ALL DRUGDOSAGES */
router.get('/', function(req, res, next) {
  Drugdosage.find(function (err, results) {
    if (err) return next(err);
    res.json({status: 200, content: results});
  });
});

/* GET SINGLE DRUGDOSAGE BY ID */
router.get('/:id', function(req, res, next) {
  Drugdosage.findOne({id: req.params.id}, function (err, results) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: results});
  });
});

/* SAVE DRUGDOSAGE */
router.post('/', function(req, res, next) {
  Drugdosage.findOne().sort({id:-1}).exec(function (err, resultMaxId) {
    req.body.id = resultMaxId.id + 1;
    Drugdosage.create(req.body, function (err, results) {
      if (err) {
        for (var prop in err.errors) {
          if (err.errors.hasOwnProperty(prop)) {
            errorMsg += err.errors[prop] + " ";
          }
        }
        res.status(400).json({error: errorMsg});
        return next(err);
      }
      res.json({status: 200, content: results});
    });
  });
});

/* UPDATE DRUGDOSAGE */
router.put('/:id', function(req, res, next) {
  Drugdosage.findOneAndUpdate({id: req.params.id}, req.body, function (err, results) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: results});
  });
});

/* DELETE DRUGDOSAGE */
router.delete('/:id', function(req, res, next) {
  Drugdosage.findOneAndRemove({id: req.params.id}, req.body, function (err, results) {
    if (err) return next(err);
    res.json({status: 200, content: results});
  });
});

module.exports = router;