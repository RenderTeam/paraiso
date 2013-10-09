var mongoose = require('mongoose');

/** Schemas from mongoose **/
var Task = require('./mongoose_models/task'),
    Resources = require('./mongoose_models/resource');

/** Conection to MongoDB and Mongo queries **/
var conectionString = 'mongodb://localhost:27017/test';
  
mongoose.connect( conectionString, function(err) {
  if ( err ) throw err;
  console.log('Successfully connected to MongoDB');
});

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
  });
};