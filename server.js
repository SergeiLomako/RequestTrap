const express = require('express');
const app = express();
const http = require('http').Server(app);
const config = require('./config');
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./routes');
require('./db');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use( (req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json();
  }
  else {
    req.io = io.of(req.originalUrl);
    next();
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

http.listen(config.server.port, err => {
  if (err) {
    console.log(err);
  }
    
  console.log(`API is now running on port ${config.server.port}`);
});

module.exports = app;
