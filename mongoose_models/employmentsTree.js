var mongoose    = require ('mongoose'),
    Employment  = require('./employment'),
    Schema      = mongoose.Schema;

var EmploymentsTreeSchema = new Schema();

//.add() is necesary if we want the recursive model
EmploymentsTreeSchema.add({
  employment: String,
  children:   [ EmploymentsTreeSchema ]
  //ancestors:  [String],
});

EmploymentsTreeSchema.methods.getEmployment = function ( employment ) {
  var query = Employment.findOne( { employment: employment } ),
      that = this;

  query.exec( function ( err, employment ) {
    if ( err ) { throw err; }
    treeSearch( that, employment.route );
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


function treeSearch ( tree, route ) {
  var smallTree = tree;
  route.forEach( function ( element, index, array) {
    smallTree = smallTree.children[element];
    console.log(smallTree);
  });
}

module.exports = mongoose.model( 'EmploymentsTree', EmploymentsTreeSchema );