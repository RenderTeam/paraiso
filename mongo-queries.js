var fs        = require('fs-extra'),
    mongoose  = require('mongoose'),
    html2jade = require('html2jade');

/** Schemas from mongoose **/
var Forms             = require('./mongoose_models/form'),
    FormsDescription  = require('./mongoose_models/formDescription'),
    Log               = require('./mongoose_models/log'),
    Resources         = require('./mongoose_models/resource'),
    Task              = require('./mongoose_models/task'),
    Employee          = require('./mongoose_models/employee'),
    User              = require('./mongoose_models/user');

/** Conection to MongoDB and Mongo queries **/
var conectionString = 'mongodb://localhost:27017/test';

mongoose.connect( conectionString, function ( err ) {
  if ( err ) { throw err; }
  console.log('Successfully connected to MongoDB');
});

//Tasks
  /**
   * Obtains one specified task
   * @param {req} Request from express
   * @param {res} Response from express
   * @return {task} Returns the task
   */
  exports.getOneTask = function ( req, res ) {
    var condition = {};
    condition._id = req.body._id;

    var query = Task.findOne( condition );

    query.select('-reminder').exec( function ( err, task ) {
      if ( err ) { throw err; }
      res.send( task );
    });
  };
  
  exports.getTasks = function ( req, res ) {
    var query = Task.find();

    query.select('assigned deadline description title').exec(
      function ( err, tasks ) {
        if ( err ) { throw err; }
        res.send( tasks );
      }
    );
  };

  exports.getTasksFromUser = function ( req, res ) {
    var condition = {};
    condition.assigned = req.user.username;
    var query = Task.find( condition );
    
    query.select('assigned deadline description title').exec(
      function ( err, task ) {
        if ( err ) { throw err; }
        res.send( task );
      }
    );
  };

  exports.saveTask = function ( req, res ) {
    req.body.task.creator = req.user.username;
    var newTask = new Task( req.body.task );

    newTask.save( function ( err ) {
      if ( err ) {
        console.log( err );
        res.send( err );
      }
      res.send( { status: true } );
    });
  };
//Employee
  exports.getEmployees = function ( req, res ) {
    var query = Employee.find();

    query.select('-_id name profile').exec(
      function ( err, employees ) {
        if ( err ) { throw err; }
        console.log(employees);
        res.send( employees );
      }
    );
  };

  exports.saveEmployee = function ( req, res ) {
    var newEmployee = new Employee( req.body.employee );

    newEmployee.save( function ( err ) {
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

  exports.getOneUser = function ( req, res ) {
    var condition = {
      username: req.body.username
    }

    var query = User.findOne( condition );

    query.select('-_id username').exec(
      function ( err, user ) {
        if ( err ) { throw err; }
        console.log(user);
        res.send( user );
      }
    );
  };
  
  exports.saveUser = function ( req, res ) {
    var newUser = new User({
      username: req.body.user,
      password: req.body.password
    });

    newUser.save( function ( err ) {
      if ( err ) {
        console.log( err );
        res.send( err );
      }
      res.send( { status: true } );
    });
  };
//Log
  exports.log = function ( req, res, next ) {
    var log = new Log({
      user:   req.user.username,
      where:  req.route.path
    });

    log.save( function ( err ) {
      if ( err ) {
        console.log( err );
      }
    });

    next();
  };
//Session handlers
  exports.login = function( req, res ) {
    var user = req.body.user,
        candidatePassword = req.body.password;
    // fetch user and test password verification
    User.findOne( { username: user }, function ( err, user ) {
      if ( err ) { throw err; }

      // test a matching password
      if ( user === null ) {
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
    //req.session.destroy( function ( err ){
    req.session.destroy();
    res.redirect('/');
    //}); linted function on err is unused. Looking for other solutions
  };

  exports.privateContent = function ( req, res, next ) {
    if ( req.session.user ) {
      var username = req.session.user.username;
      User.findOne( { 'username': username }, function ( err, obj ) {
        if ( true ) {
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
        if (err) { throw err; }
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
  };

  /*Change a collection target
    User.collection.name = 'test';
  */