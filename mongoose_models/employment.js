var mongoose  = require ('mongoose'),
    Schema    = mongoose.Schema;

var EmploymentSchema = new Schema({
  employment: String,
  department: String,
  route:      [Number]
});

module.exports = mongoose.model( 'Employment', EmploymentSchema );
