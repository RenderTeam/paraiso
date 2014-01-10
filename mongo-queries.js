var fs        = require('fs-extra'),
    mongoose  = require('mongoose'),
    html2jade = require('html2jade');

/** Schemas from mongoose **/
var Departments       = require('./mongoose_models/departments')
    Employee          = require('./mongoose_models/employee'),
    Employment        = require('./mongoose_models/employment'),
    EmploymentsTree   = require('./mongoose_models/employmentsTree'),
    Forms             = require('./mongoose_models/form'),
    FormsDescription  = require('./mongoose_models/formDescription'),
    Log               = require('./mongoose_models/log'),
    Resources         = require('./mongoose_models/resource'),
    Task              = require('./mongoose_models/task'),
    Permission        = require('./mongoose_models/permission'),
    User              = require('./mongoose_models/user');

/** Conection to MongoDB and Mongo queries **/
var conectionString = 'mongodb://localhost:27017/test';
//Tests use mocha db 
// var conectionString = 'mongodb://localhost:27017/mocha';

mongoose.connect( conectionString, function ( err ) {
  if ( err ) { throw err; }
  console.log('Successfully connected to MongoDB');
});

//Departments
  exports.getDepartments = function ( req, res ) {
    var query = Departments.find();
    query.select('-_id').exec(
      function ( err, departments ) {
        if ( err ) { throw err; }
        res.send( departments );
      }
    );
  };

  exports.saveDepartment = function ( req, res ) {
    var newDepartment = new Departments( req.body.department );

    newDepartment.save( function ( err ) {
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

    query.select('-_id').exec(
      function ( err, employees ) {
        if ( err ) { throw err; }
        res.send( employees );
      }
    );
  };

  exports.getOneEmployee = function ( req, res ) {
    var condition = {
      username: req.body.username
    };

    var query = Employee.findOne( condition );

    query.select('-_id').exec(
      function ( err, employee ) {
        if ( err ) { throw err; }
        res.send( employee );
      }
    );
  };

  exports.updateEmployee = function ( req, res ) {
    var condition = {
          username: req.body.user.username
        },
        update = req.body.user;

    Employee.update( condition, update, 
      function ( err, number, raw ) {
        res.send();
      }
    );
  }

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
//Employment
  exports.getEmployments = function ( req, res ) {
    var query = Employment.find();

    query.select('-_id -route').exec( function ( err, employments ) {
      if ( err ) { throw err };
      res.send( employments );
    });
  }

  exports.saveEmployment = function ( req, res ) {
    var father = req.body.father;
    if ( father === '' ) { 
      var newEmployment = new Employment( {
        name: req.body.employment.name,
        department: req.body.employment.department,
        route:      [ req.children ]
      });
      newEmployment.save( function ( err ) {
        if ( err ) { throw err; }
        res.send();
      } );
    } else {
      Employment.findOne( { name: father }, function ( err, employment) {
        if ( err ) { throw err };
        var route = employment.route;
        route.push( req.children );
        var newEmployment = new Employment( {
          name: req.body.employment.name,
          department: req.body.employment.department,
          route:      route
        });
        newEmployment.save( function ( err ) {
          if ( err ) { throw err; }
          res.send();
        } );
      });
    }
  }
//EmploymentsTree
  exports.updateEmploymentsTree = function ( req, res, next ) {
    var father  = req.body.father,
        child   = req.body.employment.name,
        query   = EmploymentsTree.findOne();

    query.exec( function ( err, tree ) {
      if ( err ) { throw err };
      tree.remove( function ( err, employmentsTree ) {
        if ( err ) { throw err };
      });
      if ( father === '' ) {
        req.children = tree.children.length
      } else {
        tree.getEmployment( father, function ( smallTree ) {
          req.children = smallTree.children.length;
        });
      }

      tree.insertChildren( father, { name: child } , 
        function ( newTree ){
          var newTree = new EmploymentsTree( newTree );
          newTree.save( function ( err ) {
              if ( err ) { throw err; };
              next();
              // res.send();
            }
          );
        }
      );
    });
  };

  exports.getSmallEmploymentsTree = function ( req, res ) {
    var employment = req.body.employment,
        query = EmploymentsTree.findOne();

    query.select('-_id').exec( function ( err, tree ) {
      if ( err ) { throw err };
      tree.getEmployment( employment, function ( smallTree ) {
        // res.send( smallTree );
      });
    });
  };

  exports.getEmploymentsTree = function ( req, res ) {
    var query = EmploymentsTree.findOne();

    query.select('-id').exec( function ( err, tree ) {
      if ( err ) { throw err };
      res.send( tree );
    } );
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
//Permission
  exports.getAllPermissionsStatus = function ( req, res ) {
    var query = Permission.find();

    query.select('-_id').exec(
      function ( err, permissions ) {
        if ( err ) { throw err; }
        res.send( permissions );
      }
    );
  };

  exports.getOnePermission = function ( req, res ) {
    var condition = {
      username: req.body.username
    };

    var query = Permission.findOne( condition );

    query.select('-_id').exec( function ( err, permission ) {
      if ( err ) { throw err; }
      res.send( permission );
    });
  };

  exports.updatePermission = function ( req, res ) {
    var condition = {
          username: req.body.username
        },
        update = {
          permissions: req.body.permissions
        };
    
    Permission.update( condition, update, 
      function ( err, number, raw ) {
        res.send();
      }
    );
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
    //req.session.destroy( function*( err ){
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

    query.select('assigned deadline description title creation_date').exec(
      function ( err, tasks ) {
        if ( err ) { throw err; }
        res.send( tasks );
      }
    );
  };

  exports.getTasksFromUser = function ( req, res ) {
    console.log(req.headers);
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
    };

    var query = User.findOne( condition );

    query.select('-_id username').exec(
      function ( err, user ) {
        if ( err ) { throw err; }
        res.send( user );
      }
    );
  };

  exports.saveUser = function ( req, res ) {
    var newUser = new User( req.body.user );

    newUser.save( function ( err ) {
      if ( err ) {
        console.log( err );
        res.send( err );
      }
      res.send( { status: true } );
    });
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