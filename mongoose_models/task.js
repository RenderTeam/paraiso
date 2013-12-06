var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({

  assigned:       [String],
  creation_date:  { type: Date, default: Date.now },
  creator:        [String],
  deadline:       { type: Date, default: Date.now},
  description:    String,
  label:          String,
  priority:       Number,
  reminder:       [Number],
  status:         String,
  title:          String
});

module.exports = mongoose.model('Task', TaskSchema);