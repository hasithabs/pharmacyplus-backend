
var Drugcategory = require('./model.js');

import { Router } from 'express'

const router = new Router()


var errorMsg = "";

/* GET ALL DRUGCATEGORYS */
router.get('/', function(req, res, next) {
  Drugcategory.find(function (err, results) {
    if (err) return next(err);
    res.json({status: 200, content: results});
  });
});

/* GET SINGLE DRUGCATEGORY BY ID */
router.get('/:id', function(req, res, next) {
  Drugcategory.find({id: req.params.id}, function (err, results) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: results});
  });
});

/* SAVE DRUGCATEGORY */
router.post('/', function(req, res, next) {
  Drugcategory.findOne().sort({id:-1}).exec(function (err, resultMaxId) {
    req.body.id = resultMaxId.id + 1;
    Drugcategory.create(req.body, function (err, results) {
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

/* UPDATE DRUGCATEGORY */
router.put('/:id', function(req, res, next) {
  Drugcategory.findOneAndUpdate({id: req.params.id}, req.body, function (err, results) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: results});
  });
});

/* DELETE DRUGCATEGORY */
router.delete('/:id', function(req, res, next) {
  Drugcategory.findOneAndRemove({id: req.params.id}, req.body, function (err, results) {
    if (err) return next(err);
    res.json({status: 200, content: results});
  });
});

module.exports = router;