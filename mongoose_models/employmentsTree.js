var mongoose    = require ('mongoose'),
    Employment  = require('./employment'),
    Schema      = mongoose.Schema;

var EmploymentsTreeSchema = new Schema({
  _id: false
});

//.add() is necesary if we want the recursive model
EmploymentsTreeSchema.add({
  employment: String,
  children:   [ EmploymentsTreeSchema ]
  //ancestors:  [String],
});

EmploymentsTreeSchema.methods.getEmployment = function ( employment, cb ) {
  var query = Employment.findOne( { employment: employment } ),
      temporaryTree = this,
      that = this;

  query.select('-_id').exec( function ( err, employment ) {
    if ( err ) { throw err; }
   employment.route.forEach( function ( element, index, array) {
      temporaryTree = temporaryTree.children[element];
    } );

    cb ( temporaryTree );
  });
}

EmploymentsTreeSchema.methods.insertChildren = function ( employment, child, cb ) {
  var query = Employment.findOne( { employment: employment } ),
      temporaryTree = this,
      that = this;

  query.select('-_id').exec( function ( err, employment ) {
    if ( err ) { throw err; };
    employment.route.forEach( function ( element, index, array) {
      temporaryTree = temporaryTree.children[element];
    } );
    temporaryTree.children.push({ employment: child.employment, children: []});

    cb( that );
  });
}

module.exports = mongoose.model( 'EmploymentsTree', EmploymentsTreeSchema );