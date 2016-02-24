/*global require process module*/

'use strict';

var pg = require('pg');

var config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

module.exports.getMassages = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('SELECT * FROM massages', (err, results) => {
      done();
      
      if (err) {
        console.error('Error with query', err);
      }

      res.rows = results.rows;
      next();      
    });
  });
};

module.exports.getMassage = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('SELECT * FROM massages WHERE id = $1', [req.params.id], (err, results) => {
      done();
      
      if (err) {
        console.error('Error with query', err);
      }

      res.rows = results.rows;
      next();      
    });
  });
  
};

