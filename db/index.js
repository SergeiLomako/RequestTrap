const config = require('../config');
const mongoose = require('mongoose'),
      host = config.database.uri,
      connection = mongoose.connect(host, { useNewUrlParser: true }),
      success_message = `Successfully connected to ${host}`,
      error_message = `Connect failed to database: ${host}`;

connection
  .then(db => {
    console.log(success_message);
      return db;
    })
    .catch(err => {
      if (err.message.code === 'ETIMEDOUT') {
        console.log('Attempting to re-establish database connection.');
        connection
          .then(db => {
            console.log(success_message);
            return db;
        })
          .catch(err => {
              console.log(error_message);
          });    
      } else {
        console.log(error_message);
      }
    });

module.exports = connection;