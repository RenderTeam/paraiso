var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var logSchema = new Schema({

  assigned:       [String],
  creation_date:  { type: Date, default: Date.now },
  creator:        [String]
});

module.exports = mongoose.model('Log', logSchema);