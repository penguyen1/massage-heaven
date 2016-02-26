/*global require process module*/

'use strict';

var pg = require('pg');

var config = process.env.DATABASE_URL || {
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

    client.query('SELECT * FROM massages ORDER BY id', (err, results) => {
      done();
      
      if (err) {
        console.error('Error with query', err);
      }

      res.massages = results.rows;
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

      res.massages = results.rows;
      next();      
    });
  });
  
};

module.exports.createMassage = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('INSERT INTO massages (name) VALUES ($1) RETURNING id', [req.body.name], (err, results) => {
      done();
      
      if (err) {
        console.error('Error with query', err);
      }

      res.massages = results.rows;
      next();      
    });
  });
  
};

module.exports.editMassage = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }


    client.query('UPDATE massages SET name = $1 WHERE id = $2', [req.body.name, req.params.id], (err, results) => {
      done();
      
      if (err) {
        console.error('Error with query', err);
      }

      next();      
    });

  });
  
};

module.exports.deleteMassage = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }


    client.query('DELETE FROM massages WHERE id = $1', [req.params.id], (err, results) => {
      done();
      
      if (err) {
        console.error('Error with query', err);
      }

      next();      
    });

  });
  
};

