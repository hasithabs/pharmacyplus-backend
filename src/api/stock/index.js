
var Drug = require('./model.js');
var Drugcategory = require('../drugcategory/model.js');
var Drugdosage = require('../drugdosage/model.js');
var Drugfrequency = require('../drugfrequency/model.js');

import { Router } from 'express'
// import { middleware as query } from 'querymen'
// import { middleware as body } from 'bodymen'
// import { schema } from './model'
// export User, { schema } from './model'

const router = new Router()


var errorMsg = "";

/* GET ALL DRUGS */
router.get('/', function(req, res, next) {
  Drug.find(function (err, products) {
    if (err) return next(err);
    res.json({status: 200, content: products});
  });
});

/* GET SINGLE DRUG BY ID */
router.get('/:id', function(req, res, next) {
  Drug.findOne({id: req.params.id}, function (err, post) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: post});
  });
});

/* SAVE DRUG */
router.post('/', function(req, res, next) {
  errorMsg = "";
  Drug.findOne().sort({id:-1}).exec(function (err, resultMaxId) {
    req.body.id = resultMaxId.id + 1;
    Drugcategory.find({id: req.body.category}, function (err, postCat) {
      if (err || postCat.length == 0) {
        res.status(400).json({status: 400, error: "invalid Drug category id - " + req.body.category});
        return next(err);
      }
      req.body.category = postCat[0];

      Drugdosage.find({id: req.body.dosage}, function (err, postDosage) {
        if (err || postDosage.length == 0) {
          res.status(400).json({status: 400, error: "invalid dosage id - " + req.body.dosage});
          return next(err);
        }
        req.body.dosage = postDosage[0];

        Drugfrequency.find({id: req.body.frequency}, function (err, postFreq) {
          if (err || postFreq.length == 0) {
            res.status(400).json({status: 400, error: "invalid frequency id - " + req.body.frequency});
            return next(err);
          }
          req.body.frequency = postFreq[0];

          Drug.create(req.body, function (err, post) {
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
      });
    });
  });

});

/* UPDATE DRUG */
router.put('/:id', function(req, res, next) {
  Drug.findOneAndUpdate({id: req.params.id}, req.body, function (err, post) {
    if (err) {
      res.status(400).json({status: 400, error: "invalid id - " + req.params.id});
      return next(err);
    }
    res.json({status: 200, content: post});
  });
});

/* DELETE DRUG */
router.delete('/:id', function(req, res, next) {
  Drug.findOneAndRemove({id: req.params.id}, req.body, function (err, post) {
    if (err) return next(err);
    res.json({status: 200, content: post});
  });
});

module.exports = router;