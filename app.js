/*global require __dirname process*/

"use strict"

require('dotenv').config();

var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');


var app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});

