var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    Permission  = require('./permission');

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

/**
 * After saving the employee this middleware will initiate their permissions
 * @param {doc (Object)} This is the employee saved we need its username value
 */
employeeSchema.post( 'save', function ( doc ) {
  permission = new Permission( {
    username: doc.username
  } );

  permission.save( function ( err, res ) {
    if ( err ) { throw err; }
  });
});

module.exports = mongoose.model('Employee', employeeSchema);