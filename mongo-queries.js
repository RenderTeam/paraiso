var mongoose = require('mongoose');

/** Schemas from mongoose **/
var User = require('./mongoose_models/user')
    Task = require('./mongoose_models/task');
    Resources = require('./mongoose_models/resource');

/** Conection to MongoDB and Mongo queries **/
var conectionString = 'mongodb://localhost:27017/test';

mongoose.connect( conectionString, function(err) {
  if ( err ) throw err;
  console.log('Successfully connected to MongoDB');
});

exports.getTasks = function( req, res ){  
  var query = Task.find();

  query.select('assigned deadline description title').exec(function ( err, tasks ) {
    if ( err ) throw err;ee
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

exports.getOneTask = function( req, res ){
  var condition = {};
  condition._id = req.body._id;

  var query = Task.findOne( condition );

  query.select('-reminder').exec(function ( err, task ) {
    if ( err ) throw err;
    res.send( task );
  })
};

exports.login = function( req, res ){
  var user = req.body.user,
      candidatePassword = req.body.password;
  // fetch user and test password verification
  User.findOne({ username: user }, function(err, user) {
    if (err) throw err;

    // test a matching password
    if(user == null){
      res.send( { flag: false } );
    } else{
      user.comparePassword( candidatePassword , function(err, isMatch) {
        if ( isMatch ){
          res.send( { flag: true } );
        }else{
          res.send( { flag: false } );
        }
      });
    }
  });
};

exports.saveUser = function( req, res ){
  var newUser = new User({
    username: req.body.user,
    password: req.body.password
  });

  newUser.save(function(err) {
    if (err){
      console.log( err );
      res.send( err );
    }
    res.send( {status: true} );
  });
};