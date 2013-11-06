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
  console.log(req.body);
  var condition = {};
  condition.assigned = {username: req.body.assigned};
  var query = Task.find( condition );
  
  query.select('assigned deadline description title').exec(
    function ( err, task ) {
      console.log('condition');
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
   res.redirect('/');
  });
};

exports.privateContent = function ( req, res, next ) {
  if ( req.session.user ) {
    var username = req.session.user.username;
    User.findOne( { 'username': username }, function ( err, obj ) {
      if ( true ) {
        // this variable will be available directly by the view
        res.locals.user = obj;
        // this will be added to the request object
        req.user = obj;
        next();
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
};

exports.getUserInfo =  function ( req ) {
  if ( req.session.user ) {
    console.log( req.session.user.username );
    return req.session.user.username;
  } else {
    return null;
  }
  
}


exports.saveTask = function ( req, res ) {
  /*var task = {
    creation_date:  new Date(),
    creator:        "amet",  //Se tiene que recuperar de la sesión 
    title:          'Lokcjaskdjksl te amo',
    description:    'Lolazosdfsd',
    assigned:       [{username: 'amet'}],
    deadline:       new Date(),
    reminder:       [3,2],
    label:          'gresdfsden',
    priority:       0,
    status:         'not done'
  };*/
  var newTask = new Task( req.body.task );

  newTask.save( function ( err ) {
    if ( err ) {
      console.log( err );
      res.send( err );
    }
    console.log('done');
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

exports.ghostInsert = function () {

  var task = {
    creation_date:  new Date(),
    creator:        'amet', /* Se tiene que recuperar de la sesión */
    title:          'Lol te amo',
    description:    'Lolzo',
    assigned:       ['amet'],
    deadline:       new Date(),
    reminder:       [3,2,34],
    label:          'green',
    priority:       0,
    status:         'not done'
  };
}
