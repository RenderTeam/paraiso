var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var logSchema = new Schema({

  user:   { type: String, required: true },
  where:  { type: String, required: true },
  date:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);