const mongoose = require('mongoose');
const { database: { uri } } = require('../config');
const connection = mongoose.connect(uri, { useNewUrlParser: true });
const success_message = `Successfully connected to ${ uri }`;
const error_message = `Connect failed to database: ${ uri }`;

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