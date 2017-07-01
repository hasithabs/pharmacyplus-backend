
var Prescription = require('./model.js');

import { Router } from 'express'
// import { middleware as query } from 'querymen'
// import { middleware as body } from 'bodymen'
// import { schema } from './model'
// export User, { schema } from './model'

const router = new Router()


var errorMsg = "";

/* GET ALL DRUGS */
router.get('/', function(req, res, next) {
  Prescription.find(function (err, products) {
    if (err) return next(err);
    res.json({status: 200, content: products});
  });
});

/* GET SINGLE DRUG BY ID */
router.get('/:id', function(req, res, next) {
  Prescription.findById(req.params.id, function (err, post) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: post});
  });
});

/* SAVE Prescription */
router.post('/', function(req, res, next) {
  errorMsg = "";

        Prescription.create(req.body, function (err, post) {
          if (err) {
            for (var prop in err.errors) {
              if (err.errors.hasOwnProperty(prop)) {
                errorMsg += err.errors[prop] + " ";
              }
            }
            res.status(400).json({error: errorMsg});
            return next(err);
          }
          res.json({status: 201, content: post});
        });
});

/* UPDATE DRUG */
router.put('/:id', function(req, res, next) {
  Prescription.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      res.status(232).json(err);
      // res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: post});
  });
});

/* DELETE DRUG */
router.delete('/:id', function(req, res, next) {
  Prescription.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({status: 200, content: post});
  });
});

module.exports = router;