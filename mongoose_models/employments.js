var mongoose = require ('mongoose'),
  Schema = mongoose.Schema;

var employmentSchema = new Schema({

  employment: String,
  ancestors:  [String],
  parent:     String

});

module.exports = mongoose.model('Employments', employmentSchema);