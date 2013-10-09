var mongoose = require('mongoose');

/** Schemas from mongoose **/
var Task = require('./mongoose_models/task'),
    User = require('./mongoose_models/user');

/** Conection to MongoDB and Mongo queries **/
var conectionString = 'mongodb://localhost:27017/test';
  
mongoose.connect( conectionString, function(err) {
  if ( err ) throw err;
  console.log('Successfully connected to MongoDB');
});

User.findOne({ username: 'jmar777' }, function(err, user) {
  if (err) throw err;

  // test a matching password
  user.comparePassword('Password123', function(err, isMatch) {
    if (err) throw err;
    console.log('Password123:', isMatch); // -> Password123: true
  });

  // test a failing password
  user.comparePassword('123Password', function(err, isMatch) {
    if (err) throw err;
    console.log('123Password:', isMatch); // -> 123Password: false
  });
});

exports.login = function( req, res ){
  
}

exports.getOneTask = function( req, res ){
  var condition = {};

  condition._id = req.body._id;

  var query = Task.findOne( condition );

  query.select('-reminder').exec(function ( err, task ) {
    if ( err ) throw err;
    res.send( task );
  })
};

exports.getTasks = function( req, res ){  
  var query = Task.find();

  query.select('assigned deadline description title').exec(function ( err, tasks ) {
    if ( err ) throw err;
    res.send( tasks );
  });
};