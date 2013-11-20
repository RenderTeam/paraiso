var mongoose = require('mongoose'),
    fs = require('fs-extra'),
    html2jade = require('html2jade');

/** Schemas from mongoose **/
var User = require('./mongoose_models/user'),
    Task = require('./mongoose_models/task'),
    Forms = require('./mongoose_models/form'),
    FormsDescription = require('./mongoose_models/formDescription')
    Resources = require('./mongoose_models/resource');

/** Conection to MongoDB and Mongo queries **/
var conectionString = 'mongodb://localhost:27017/test';

mongoose.connect( conectionString, function ( err ) {
  if ( err ) throw err;
  console.log('Successfully connected to MongoDB');
});

//Tasks
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
    condition.assigned = [ req.user.username ];
    var query = Task.find( condition );
    
    query.select('assigned deadline description title').exec(
      function ( err, task ) {
        if ( err ) throw err;
        res.send( task );
      }
    );
  };

  exports.saveTask = function ( req, res ) {
    req.body.task.creator = req.user.username;
    console.log(req.body.task);
    var newTask = new Task( req.body.task );

    newTask.save( function ( err ) {
      if ( err ) {
        console.log( err );
        res.send( err );
      }
      res.send( { status: true } );
    });
  };
//User
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
//Session handlers
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
// Form buider mock

  exports.createForm = function ( req, res ) {
    html2jade.convertHtml(req.body.HTML, {}, function (err, jade) {
      var formsPath = './views/forms/rendered';
        jade = jade.substring(16);
        jade = jade.replace(/(\r\n|\n|\r)/gm,"%");
        jade = jade.replace(/\x25\s\s\s\s/gm,"\n");
        jade = jade.replace(/\x25/gm,"");
      fs.writeFile( formsPath + '/form200.jade', jade , function (err) {
        if (err) throw err;
        console.log( 'Creado ' + formsPath + '/form.jade');
      });
    });

    res.send({status: true});
    /*var newForm = new FormsDescription({
      name: "fom1",
      description: "lol"
    });

    newForm.save(function ( err ) {
      if ( err ) {
        console.log( err );
      }
      console.log('saved');
    });*/
  }

  /*Change a collection target
    User.collection.name = 'test';
  */