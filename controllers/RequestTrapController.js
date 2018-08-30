const fs = require('fs');
const appRoot = require('app-root-path');
const ejs = require('ejs');
const RequestTrap = require('../models/requestTrap');
const template = fs.readFileSync(appRoot + '/views/singleRequest.ejs', 'utf-8');

exports.save = (req, res) => {
  const io = req.io;
  const data = {
    request: req.params.trap_id,
    query_string: req.originalUrl,
    remote_ip: req.header('x-forwarded-for') || req.client.remoteAddress,
    method: req.method,
    scheme: req.protocol,
    query_params: req.body,
    headers: req.headers,
    cookies: req.cookies
  };

  const NewTrap = new RequestTrap(data);

  NewTrap.save( err => {
    if(err){
      res.send(err);
    }

    const html = ejs.render(template, {trap: data});
    console.log(html);
    io.emit('newRequest', html);
    res.status(201).send('Model created successfully!!!');

  });
};

exports.getRequestList = (req, res) => {
  RequestTrap.find({request: req.params.trap_id})
    .sort({'createdAt': -1})
    .exec((err, traps) => {
    if (err) {
      res.send(err);
    }
    else if (traps.length == 0) {
      res.send('Page not found')
         .status(404);
    }
    else {
      res.render('requests', {traps: traps, trap_id: req.params.trap_id});
    }
  });
};  