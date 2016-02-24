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

module.exports.getMasseuists = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('SELECT * FROM masseuists ORDER BY id', (err, results) => {
      done();
      
      if (err) {
        console.error('Error with query', err);
      }

      res.masseuists = results.rows;
      next();      
    });
  });
};

module.exports.getMasseuist = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }

    client.query('SELECT masseuists.id as id, masseuists.name as name, array_agg(massages.name) as massages FROM masseuists LEFT JOIN proficiencies on proficiencies.masseuist_id = masseuists.id LEFT JOIN massages on proficiencies.massage_id = massages.id WHERE masseuists.id = $1 GROUP BY masseuists.name, masseuists.id;', [req.params.id], (err, results) => {
      done();
      
      if (err) {
        console.error('Error with query', err);
      }

      res.masseuists = results.rows;
      next();      

    });
  });
  
};

module.exports.createMasseuist = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }


    client.query('INSERT INTO masseuists (name) VALUES ($1) RETURNING id', [req.body.name], (err, results) => {
      
      if (err) {
        console.error('Error with query', err);
      }

      res.masseuists = results.rows;
      
      req.body.massages.forEach((massage, index) => {
        client.query('INSERT INTO proficiencies (masseuist_id, massage_id) VALUES ($1, $2)', [results.rows[0].id, parseInt(massage)], (err, results) => {
          if (err) {
            console.error('Error with query', err);
          }

          if (index === req.body.massages.length - 1) {
            done();
            next();
          }
        });
      });
    });
  });
};

module.exports.editMasseuist = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }
    console.log(req.body);

    client.query('UPDATE masseuists SET name = $1 WHERE id = $2', [req.body.name, req.params.id], (err, results) => {
      // done();
      
      if (err) {
        console.error('Error with query', err);
      }

      client.query('DELETE FROM proficiencies WHERE masseuist_id = $1', [req.params.id], (err, result) => {
        req.body.massages.forEach((massage, index) => {
          client.query('INSERT INTO proficiencies (masseuist_id, massage_id) VALUES ($1, $2)', [req.params.id, parseInt(massage)], (err, results) => {
            if (err) {
              console.error('Error with query', err);
            }

            if (index === req.body.massages.length - 1) {
              done();
              next();
            }
          });
        });
      });
      
      // next();      
    });

  });
  
};

module.exports.deleteMasseuist = (req, res, next) => {
  pg.connect(config, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      res.status(500).json({success: false, data: err});
    }


    client.query('DELETE FROM masseuists WHERE id = $1', [req.params.id], (err, results) => {
      done();
      if (err) {
        console.error('Error with query', err);
      }

      next();
    });

  });
  
};



