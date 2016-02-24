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

router.post('/', db.createMassage, (req, res) => {
  res.redirect(`/massages/${res.rows[0].id}`);
});

router.get('/new', (req, res) => {
  res.render('massages/new', {massage: {name: ''}});
});

router.get('/:id', db.getMassage, (req, res) => {
  res.render('massages/show', {massage: res.rows[0]});
});

router.get('/:id/edit', db.getMassage, (req, res) => {
  res.render('massages/edit', {massage: res.rows[0]});
});

router.put('/:id', notImplemented);
router.delete('/:id', notImplemented);

module.exports = router;
