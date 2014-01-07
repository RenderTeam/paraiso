var mongoose  = require ('mongoose'),
    Schema    = mongoose.Schema;

var EmploymentSchema = new Schema();

//.add() is necesary if we want the recursive model
EmploymentSchema.add({
  name:     String,
  children: [ EmploymentSchema ]
  //ancestors:  [String],
});

module.exports = mongoose.model( 'Employments', EmploymentSchema );