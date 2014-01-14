var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var departmentSchema = new Schema({
  department: { type: String, required: true }
});

module.exports = mongoose.model('Department', departmentSchema);