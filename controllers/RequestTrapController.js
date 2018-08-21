const RequestTrap = require('../models/requestTrap');

exports.save = (req, res) => {
  let remote_ip = req.ip.split(':');
  remote_ip = remote_ip[remote_ip.length - 1];
  
  const request_data = {
    request: req.params.trap_id,
    query_string: req.originalUrl,
    remote_ip: remote_ip,
    method: req.method,
    scheme: req.protocol,
    query_params: req.body,
    headers: req.headers,
    cookies: req.cookies
  };
  
  const NewTrap = new RequestTrap(request_data);

  NewTrap.save( err => {
    if(err){
      res.send(err);
    }
       
    res.status(201).send('Model created successfully!!!');
  });
};

exports.getRequestList = (req, res) => {
  RequestTrap.find({request: req.params.trap_id}).sort([['createdAt', -1]]).exec((err, traps) => {
    if (err) {
      res.send(err);
    }
    if (traps.length == 0) {
      res.status(404).send('Page not found');
    }

    res.render('requests', {traps: traps, trap_id: req.params.trap_id});
  });
};  