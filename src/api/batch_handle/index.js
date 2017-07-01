var Batch = require('./model.js');

import { Router } from 'express'

const router = new Router()


var errorMsg = "";

/* GET ALL BATCHES */
router.get('/', function(req, res, next) {
  Batch.find(function (err, batches) {
    if (err) return next(err);
    res.json({status: 200, content: batches});
  });
});

/* GET SINGLE BATCH BY ID */
router.get('/:id', function(req, res, next) {
  Batch.findById(req.params.id, function (err, post) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: post});
  });
});

/* SAVE BATCH */
router.post('/', function(req, res, next) {
  Batch.create(req.body, function (err, post) {
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

/* UPDATE BATCH */
router.put('/:id', function(req, res, next) {
  Batch.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      res.status(232).json(err);
      // res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: post});
  });
});


/* DELETE BATCH */
router.delete('/:id', function(req, res, next) {
  Batch.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({status: 200, content: post});
  });
});

module.exports = router;
