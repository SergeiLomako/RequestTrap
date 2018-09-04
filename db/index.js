const mongoose = require('mongoose');
const { database: { uri } } = require('../config');

(async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true });
        console.log(`Successfully connected to ${ uri }`);
    } catch (err) {
        console.log(`Connect failed to database: ${ uri } (${err})`);
    } 
})();
