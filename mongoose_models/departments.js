var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    Permission  = require('./permission');

var DepartmensSchema = new Schema({
  name: { type:String , required = true }
});

module.exports = mongoose.model( 'Departments' , DepartmensSchema);