import mongoose from 'mongoose';

import config from '/config';

mongoose.Promise = global.Promise;

const connection = mongoose.connect(config.database.uri);

connection
    .then(db => {
        console.log(`Successfully connected to ${config.database.uri} MongoDB cluster in ${
            config.env}`);
        return db;
    })
    .catch(err => {
        if (err.message.code === 'ETIMEDOUT') {
            console.log('Attempting to re-establish database connection.');
            mongoose.connect(config.database.uri);
        } else {
            console.log(`Connect failed to database: ${config.database.uri}`);
        }
    });

export default connection;