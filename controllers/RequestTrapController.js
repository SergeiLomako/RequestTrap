const RequestTrap = require('../models/requestTrap');

exports.save = (req, res) => {
  const NewTrap = new RequestTrap({
    request: req.params.trap_id,
    query_string: req.originalUrl,
    remote_ip: req.header('x-forwarded-for') || req.client.remoteAddress,
    method: req.method,
    scheme: req.protocol,
    query_params: req.body,
    headers: req.headers,
    cookies: req.cookies
  });

  NewTrap.save( err => {
    if(err){
      res.send(err);
    }
       
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