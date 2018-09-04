const fs = require('fs');
const appRoot = require('app-root-path');
const ejs = require('ejs');
const RequestTrap = require('../models/requestTrap');
const template = fs.readFileSync(`${appRoot}/views/singleRequest.ejs`, 'utf-8');

exports.save = (req, res) => {
  const trap = {
    request: req.path,
    query_string: req.originalUrl,
    remote_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    method: req.method,
    scheme: req.protocol,
    query_params: req.method === 'GET' ? req.query : req.body,
    headers: req.headers,
    cookies: req.cookies
  };

  new RequestTrap(trap).save( err => {
    if(err){ res.send(err) }

    const html = ejs.render(template, { trap });
    req.io.emit('newRequest', html);
    res.status(201).send('Model created successfully!!!');
  });
};

exports.getRequestList = (req, res) => {
  RequestTrap.find({ request: req.params.trap_id })
    .sort({ 'createdAt': -1 })
    .exec((err, traps) => {
    if (err) { res.send(err) }
    else if (traps.length === 0) { res.send('Page not found').status(404)}
    else { res.render('requests', { traps, trap_id: req.params.trap_id }) }
  });
};  