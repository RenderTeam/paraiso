var mongoose = require('mongoose');

/** Schemas from mongoose **/
var User = require('./mongoose_models/user');
var Task = require('./mongoose_models/task');

/** Conection to MongoDB and Mongo queries **/
var conectionString = 'mongodb://localhost:27017/test';

mongoose.connect( conectionString, function(err) {
  if ( err ) throw err;
  console.log('Successfully connected to MongoDB');
});

exports.login = function( req, res ){
  var user = 'jmar777',
      candidatePassword = 'lo';

  // fetch user and test password verification
  User.findOne({ username: user }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword( candidatePassword , function(err, isMatch) {
      if (err) throw err;
      console.log(isMatch); // -> Password123: true
    });
  });
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

exports.getTasksFromUser = function( req, res ){  
  var condition = {};

  condition.assigned = req.body.assigned;

  var query = Task.find( condition );

  query.select('assigned deadline description title').exec(function ( err, task ) {
    if ( err ) throw err;
    res.send( task );
  })
};