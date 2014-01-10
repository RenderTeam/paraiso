var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var DeparmentsSchema = new Schema({
  name: { type:String , required: true, index: { unique: true } }
});

module.exports = mongoose.model( 'Departments' , DeparmentsSchema);