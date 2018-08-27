const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const RequestTrapSchema = new mongoose.Schema({
  request: {type: String, index: true},
  query_string: String,
  remote_ip: String,
  method: String,
  scheme: String,
  query_params: Object,
  headers: Object,
  cookies: Object
}, {collection: 'traps'});

RequestTrapSchema.plugin(timestamps);

module.exports = mongoose.model('RequestTrap', RequestTrapSchema);