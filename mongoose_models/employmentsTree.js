var mongoose    = require ('mongoose'),
    Employment  = require('./employment'),
    Schema      = mongoose.Schema;

var EmploymentsTreeSchema = new Schema({
  _id: false
});

//.add() is necesary if we want the recursive model
EmploymentsTreeSchema.add({
  name: String,
  children:   [ EmploymentsTreeSchema ],
  size: { type: Number, default: 1 }
  //ancestors:  [String],
});

EmploymentsTreeSchema.methods.getEmployment = function ( employment, cb ) {
  var query = Employment.findOne( { name: employment } ),
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
  var query = Employment.findOne( { name: employment } ),
      temporaryTree = this,
      that = this;

  if ( employment === '' ) {
    this.children.push( { name: child.name, children: []} );
    cb ( that );
    return;
  } else {
    query.select('-_id').exec( function ( err, employment ) {
      if ( err ) { throw err; };
      employment.route.forEach( function ( element, index, array) {
        temporaryTree = temporaryTree.children[element];
      } );
      temporaryTree.children.push({ name: child.name, children: []});

      cb( that );
    });
  }
}

module.exports = mongoose.model( 'EmploymentsTree', EmploymentsTreeSchema );