var mongoose = require('mongoose'),
    app      = require('./app.js');

/** Schemas from mongoose **/
var User = require('./mongoose_models/user')
    Task = require('./mongoose_models/task');
    Resources = require('./mongoose_models/resource');

/** Conection to MongoDB and Mongo queries **/
var conectionString = 'mongodb://localhost:27017/test';

mongoose.connect( conectionString, function ( err ) {
  if ( err ) throw err;
  console.log('Successfully connected to MongoDB');
});

exports.getOneTask = function ( req, res ) {
  var condition = {};
  condition._id = req.body._id;

  var query = Task.findOne( condition );

  query.select('-reminder').exec( function ( err, task ) {
    if ( err ) throw err;
    res.send( task );
  })
};

exports.getTasks = function ( req, res ) {
  var query = Task.find();

  query.select('assigned deadline description title').exec(
    function ( err, tasks ) {
      if ( err ) throw err;
      res.send( tasks );
    }
  );
};

exports.getTasksFromUser = function ( req, res ) {
  var condition = {};
  condition.assigned = req.body.assigned;

  var query = Task.find( condition );
  
  query.select('assigned deadline description title').exec(
    function ( err, task ) {
      if ( err ) throw err;
      res.send( task );
    }
  );
};

exports.getUsersNames = function ( req, res ) {
  var query = User.find();

  query.select('username -_id').exec(
    function ( err, users ) {
      if ( err ) {
        console.log( err );
        res.send( err );
      }
      console.log( users );
      res.send( users );
    }
  );
};

exports.login = function( req, res ) {
  var user = req.body.user,
      candidatePassword = req.body.password;
  // fetch user and test password verification
  User.findOne( { username: user }, function ( err, user ) {
    if ( err ) throw err;

    // test a matching password
    if ( user == null ) {
      res.send( { flag: false } );
    } else {
      user.comparePassword( candidatePassword , function ( err, isMatch ) {
        if ( isMatch ) {
          req.session.user = user;
          console.log('tu sesión es: ' + user)
          res.send( { flag: true } );
        }else{
          res.send( { flag: false } );
        }
      });
    }
  });
};

exports.logout = function( req, res ) {
   req.session.destroy( function ( err ){
   console.log('destoyed');
   res.re
  });
};

exports.saveTask = function ( req, res ) {
  var newTask = new Task( req.body.task );

  newTask.save( function ( err ) {
    if ( err ) {
      console.log( err );
      res.send( err );
    }
    res.send( { status: true } );
  });
};

exports.saveUser = function ( req, res ) {
  var newUser = new User({
    username: req.body.user,
    password: req.body.password
  });

  newUser.save( function ( err ) {
    if ( err ){
      console.log( err );
      res.send( err );
    }
    res.send( { status: true } );
  });
};

exports.privateContent = function ( req, res, next ) {
  if ( req.session.user ) {
    var username = req.session.user.username;
    User.findOne( { 'username': username }, function ( err, obj ) {
      if ( true ) {
        console.log( 'el usuario actual es:' + username );
        var currentUser = username;
        next();
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
}
