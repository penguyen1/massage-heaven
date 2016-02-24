/*global require module*/

'use strict';

var express = require('express');
var router = express.Router();

var notImplemented = (req, res) => {
  res.send(req.method + ' massages is not implemted');
};

router.get('/', notImplemented);
router.post('/', notImplemented);
router.get('/new', notImplemented);
router.get('/:id', notImplemented);
router.get('/:id/edit', notImplemented);
router.put('/:id', notImplemented);
router.delete('/:id', notImplemented);

module.exports = router;
