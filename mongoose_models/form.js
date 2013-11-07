var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormSchema = new Schema({
  inputs: [ { field: String, value: {} } ]
});

module.exports = mongoose.model('Forms', FormSchema);