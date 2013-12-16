var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var employeeSchema = new Schema({
  username:         { type: String, required: true},
  name:             { type: String, required: true },
  mail:             { type: String, required: true },
  last_father_name: { type: String, required: true },
  last_mother_name: { type: String, required: true },
  date_of_birth:    { type: Date, required: true },
  age:              { type: Number, required: true },
  address:          { type: String, required: true },

  profesional:{
    degree:               { type: String },
    resume:               { type: String },
    professional_license: { type: String }
  },

  health:{
    allergies:      { type: String },
    blood_type:     { type: String },
    health_record:  { type: String }
  },

  profile:{
    department: { type: String },
    employment: { type: String }
  }
});

module.exports = mongoose.model('Employee', employeeSchema);