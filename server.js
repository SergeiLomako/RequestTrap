const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./routes');
require('./db');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3000, err => {
  if (err) {
    console.log(err);
  }
    
  console.log('API is now running on port 3000');
});

module.exports = app;
