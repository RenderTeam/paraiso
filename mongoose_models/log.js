var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var logSchema = new Schema({
  who:   { type: String, required: true },
  what:   { type: String, required: true},
  when:   { type: String, required: true }
});

module.exports = mongoose.model('Log', logSchema);