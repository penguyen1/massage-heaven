/*global require module*/

'use strict';

var express = require('express');
var router = express.Router();
var db = require('../db/masseuists');
var massages = require('../db/massages.js');

var notImplemented = (req, res) => {
  res.send(req.method + ' massages is not implemted');
};

router.get('/', db.getMasseuists,  (req, res) => {
  res.render('masseuists/index', {masseuists: res.masseuists});
});

router.post('/', db.createMasseuist, (req, res) => {
  res.redirect(`masseuists/${res.masseuists[0].id}`);
});

router.get('/new', massages.getMassages, (req, res) => {
  res.render('masseuists/new', {masseuist: {name: '', massages: []}, massages: res.massages});
});

router.get('/:id', db.getMasseuist, (req, res) => {
  res.render('masseuists/show', {masseuist: res.masseuists[0]});
});

router.get('/:id/edit', db.getMasseuist, massages.getMassages, (req, res) => {
  res.render('masseuists/edit', {masseuist: res.masseuists[0], massages: res.massages});
});

router.put('/:id', db.editMasseuist, (req, res) => {
  res.status(303).redirect(`/masseuists/${req.params.id}`);
});

router.delete('/:id', db.deleteMasseuist, (req, res) => {
  res.redirect('./');
});

module.exports = router;
