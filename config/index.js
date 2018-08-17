require('dotenv').config({ path: '/.env' });

export default {
    env: process.env.NODE_ENV || 'development',
    server: {
        host: process.env.HOST || 'http://localhost/',
        port: process.env.PORT || 3000
    },
    database: {
        uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/request_trap'
    } 
    
};