var mongoose = require ('mongoose'),
  Schema = mongoose.Schema;

var employmentSchema = new Schema({

  name: String,
  //ancestors:  [String],
  children:   [{}]

});

module.exports = mongoose.model('Employments', employmentSchema);