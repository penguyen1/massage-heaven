/*global require module*/

'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/massages');

var notImplemented = (req, res) => {
  res.send(req.method + ' massages is not implemted');
};

router.get('/', db.getMassages,  (req, res) => {
  res.render('massages/index', {massages: res.rows});
});

router.post('/', notImplemented);
router.get('/new', notImplemented);
router.get('/:id', notImplemented);
router.get('/:id/edit', notImplemented);
router.put('/:id', notImplemented);
router.delete('/:id', notImplemented);

module.exports = router;
