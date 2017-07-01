
var PrescriptionDurations = require('./model.js');

import { Router } from 'express'

const router = new Router()


var errorMsg = "";

/* GET ALL DRUGCATEGORYS */
router.get('/', function(req, res, next) {
  PrescriptionDurations.find(function (err, products) {
    if (err) return next(err);
    res.json({status: 200, content: products});
  });
});

/* GET SINGLE DRUGCATEGORY BY ID */
router.get('/:id', function(req, res, next) {
  PrescriptionDurations.findById(req.params.id, function (err, post) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: post});
  });
});

/* SAVE DRUGCATEGORY */
router.post('/', function(req, res, next) {
  PrescriptionDurations.create(req.body, function (err, post) {
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

/* UPDATE DRUGCATEGORY */
router.put('/:id', function(req, res, next) {
  PrescriptionDurations.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      res.status(232).json(err);
      // res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: post});
  });
});

/* DELETE DRUGCATEGORY */
router.delete('/:id', function(req, res, next) {
  PrescriptionDurations.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({status: 200, content: post});
  });
});

module.exports = router;