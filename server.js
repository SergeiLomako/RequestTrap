import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import config from '/config';
const api = express();

api.use(cors());

api.listen(config.server.port, err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    require('/db');

    fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
        require('./routes/' + file)(api);
    });

    console.log(`API is now running on port ${config.server.port} in ${config.env} mode`);
});

module.exports = api;