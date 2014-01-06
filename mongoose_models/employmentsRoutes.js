var mongoose  = require ('mongoose'),
    Schema    = mongoose.Schema;

var EmploymentRoutesSchema = new Schema({
  name:   String,
  route:  [Number]
});

module.exports = mongoose.model( 'EmploymentRoutes', EmploymentRoutesSchema );