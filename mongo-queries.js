var fs        = require('fs-extra'),
    mongoose  = require('mongoose'),
    html2jade = require('html2jade');

/** Schemas from mongoose **/
var Departments       = require('./mongoose_models/departments'),
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

var schemas = {
  departments       :require('./mongoose_models/departments'),
  employees         :require('./mongoose_models/employee'),
  employments       :require('./mongoose_models/employment'),
  employmentsTrees  :require('./mongoose_models/employmentsTree'),
  forms             :require('./mongoose_models/form'),
  formsDescriptions :require('./mongoose_models/formDescription'),
  logs              :require('./mongoose_models/log'),
  resources         :require('./mongoose_models/resource'),
  tasks             :require('./mongoose_models/task'),
  permissions       :require('./mongoose_models/permission'),
  users             :require('./mongoose_models/user')
}

/** Conection to MongoDB and Mongo queries **/
var conectionString = 'mongodb://localhost:27017/test';
//Tests use mocha db 
// var conectionString = 'mongodb://localhost:27017/mocha';

mongoose.connect( conectionString, function ( err ) {
  if ( err ) { throw err; }
  console.log('Successfully connected to MongoDB');
});

  exports.getAll = function ( req, res ) {
    var condition = {},
        schema    = req.params.schema;

    var query = schemas[schema].find();

    query.select('-_id').exec( function ( err, docs ) {
      if ( err ) { throw err; };
      res.send( docs );
    });
  }

  exports.getAllFiltered = function ( req, res ) {
    var condition = {},
        filter    = req.params.filter,
        schema    = req.params.schema;

    switch ( filter ) {
      /*
       * Tasks is an exception because of the property in filter do no match 
       * with the username from the session property. #YOLO
       */
      case 'tasks':
        condition.assigned = req.user.username;
        break;
      default:
        condition[filter] = req.body[filter];
        break;
    }
    var query = schemas[schema].find( condition );

    query.select('-_id').exec( function ( err, docs ) {
      if ( err ) { throw err; };
      res.send( docs );
    });
  }

  exports.getOne = function ( req, res ) {
    var condition = {},
        schema = req.params.schema;

    var query = schemas[schema].findOne();

    query.select('-_id').exec( function ( err, doc ) {
      if ( err ) { throw err; };
      res.send( doc );
    } );
  }

  exports.getOneFiltered = function ( req, res ) {
    var condition = {},
        filter = req.params.filter,
        schema = req.params.schema;

    condition[filter] = req.body[filter];

    var query = schemas[schema].findOne( condition );

    query.select('-_id').exec( function ( err, doc ) {
      if ( err ) { throw err; };
      res.send( doc );
    } );
  }

  exports.save = function ( req, res ) {
    var schema    = req.params.schema,
        reference = req.params.reference;

    switch ( schema ){
      case 'tasks':
        req.body[reference].creator = req.user.username;
        break;
    }

    var newDocument = new schemas[schema]( req.body[reference] );

    newDocument.save( function ( err ) {
      if ( err ) { throw err; };
      res.send( { status: true } );
    } );
  }

  exports.update = function ( req, res ) {
    var schema    = req.params.schema,
        filter    = req.params.filter,
        doc       = req.params.document,
        condition = {},
        update    = {};

    condition[filter] = req.body[filter];
    update            = req.body[doc];

    schemas[schema].update( condition, update, function ( err, number, raw ) {
      if ( err ) { throw err; };
      res.send();
    } );
  }
  /* This two are exceptions */
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
//Employee
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
//Employment

  exports.getSmallEmploymentsTree = function ( req, res ) {
    var employment = req.body.employment,
        query = EmploymentsTree.findOne();

    query.select('-_id').exec( function ( err, tree ) {
      if ( err ) { throw err };
      tree.getEmployment( employment, function ( smallTree ) {
        res.send( smallTree );
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

    console.log( 'the path is: '  + req.route.path );

    switch( true ) {

      case /organization/.test( req.route.path ) :
        console.log('get');
        console.log( 'who: ' + req.user.username );
        console.log( 'what: visited (find)' );
        console.log( 'where: ' + req.route.path );
        console.log( 'when: ' + getOperationDate() );
        var log = new Log({
          who: req.user.username,
          what: 'consulta de datos de la organzación',
          where: req.route.path,
          when: getOperationDate()
        });

        log.save( function ( err ) {
          if ( err ) {
            console.log( err );
            res.send( err );
          } else {        
            res.send( { status: true } );
            console.log('log enviado');
          }
        });

      break;

      case /management/.test( req.route.path ) :
        console.log( 'save' );
        console.log( 'who: ' + req.user.username );
        console.log( 'what: datos creados');
        console.log( 'where: ' + req.route.path );
        console.log( 'when: ' + getOperationDate() );
        var log = new Log({
          who: req.user.username,
          what: 'Tarea de administrador (?) ',
          where: req.route.path,
          when: getOperationDate()
        });

        log.save( function ( err ) {
          if ( err ) {
            console.log( err );
            res.send( err );
          } else {        
            res.send( { status: true } );
            console.log('log enviado');
          }
        });
      break;
      case /new/.test( req.route.path ) :
        console.log( 'update' );
        console.log( 'who: ' + req.user.username );
        console.log( 'what: datos cambiados ' );
        console.log( 'where: ' + req.route.path );
        console.log( 'when: ' + getOperationDate() );
        var log = new Log({
          who: req.user.username,
          what: 'creación de stuff',
          where: req.route.path,
          when: getOperationDate()
        });

        log.save( function ( err ) {
          if ( err ) {
            console.log( err );
            res.send( err );
          } else {        
            res.send( { status: true } );
            console.log('log enviado');
          }
        });

      break;

      case /all/.test( req.route.path ) :
        console.log( 'update' );
        console.log( 'who: ' + req.user.username );
        console.log( 'consulta general de datos' );
        console.log( 'where: ' + req.route.path );
        console.log( 'when: ' + getOperationDate() );
        var log = new Log({
          who: req.user.username,
          what: 'consulta general de datos',
          where: req.route.path,
          when: getOperationDate()
        });

        log.save( function ( err ) {
          if ( err ) {
            console.log( err );
            res.send( err );
          } else {        
            res.send( { status: true } );
            console.log('log enviado');
          }
        });
      break;

      case /single/.test( req.route.path ) :
        console.log( 'update' );
        console.log( 'who: ' + req.user.username );
        console.log( 'what: consulta específica de datos ' );
        console.log( 'where: ' + req.route.path );
        console.log( 'when: ' + getOperationDate() );
        var log = new Log({
          who: req.user.username,
          what: 'Consulta específica de datos',
          where: req.route.path,
          when: getOperationDate()
        });

        log.save( function ( err ) {
          if ( err ) {
            console.log( err );
            res.send( err );
          } else {        
            res.send( { status: true } );
            console.log('log enviado');
          }
        });
      break;


      case /form/.test( req.route.path ) :
        console.log( 'update' );
        console.log( 'who: ' + req.user.username );
        console.log( 'what: creación de formulario' );
        console.log( 'where: ' + req.route.path );
        console.log( 'when: ' + getOperationDate() );
        var log = new Log({
          who: req.user.username,
          what: 'creación de formulario',
          where: req.route.path,
          when: getOperationDate()
        });

        log.save( function ( err ) {
          if ( err ) {
            console.log( err );
            res.send( err );
          } else {        
            res.send( { status: true } );
            console.log('log enviado');
          }
        });
      break;

      case /update/.test( req.route.path ) :
        console.log( 'update' );
        console.log( 'who: ' + req.user.username );
        console.log( 'what: datos cambiados ' );
        console.log( 'where: ' + req.route.path );
        console.log( 'when: ' + getOperationDate() );
        var log = new Log({
          who: req.user.username,
          what: 'datos cambiados',
          where: req.route.path,
          when: getOperationDate()
        });

        log.save( function ( err ) {
          if ( err ) {
            console.log( err );
            res.send( err );
          } else {        
            res.send( { status: true } );
            console.log('log enviado');
          }
        });
      break;

      case /delete/.test( req.route.path ) :
        console.log( 'update' );
        console.log( 'who: ' + req.user.username );
        console.log( 'what: datos eliminados ' );
        console.log( 'where: ' + req.route.path );
        console.log( 'when: ' + getOperationDate() );
        var log = new Log({
          who: req.user.username,
          what: 'datos eliminados',
          where: req.route.path,
          when: getOperationDate()
        });

        log.save( function ( err ) {
          if ( err ) {
            console.log( err );
            res.send( err );
          } else {        
            res.send( { status: true } );
            console.log('log enviado');
          }
        });
      break;

      default:
        console.log( 'irrelephant' );
        console.log( 'who: ' + req.user.username );
        console.log( 'what: algo que aún no está contemplado, y así. ' );
        console.log( 'where: ' + req.route.path );
        console.log( 'when: ' + getOperationDate() );
        var log = new Log({
          who: req.user.username,
          what: 'algo que aún no está contemplado, y así',
          where: req.route.path,
          when: getOperationDate()
        });

        log.save( function ( err ) {
          if ( err ) {
            console.log( err );
            res.send( err );
          } else {        
            res.send( { status: true } );
            console.log('log enviado');
          }
        });

      break;
      
    }
    next();
  };

//Forms
  exports.customForm = function ( req, res ) {
    var form = req.body.formSent;
    html2jade.convertHtml(form, {}, function ( err, jade ) {
      var formsPath = './views/forms-generator/rendered';
          jade = jade.substring(16);
          jade = jade.replace(/(\r\n|\n|\r)/gm,"%");
          jade = jade.replace(/\x25\s\s\s\s/gm,"\n");
          jade = jade.replace(/\x25/gm,"");
        fs.writeFile( formsPath + '/form201.jade', jade , function (err) {
        if (err) { throw err; }
        console.log( 'Creado ' + formsPath + '/form.jade');
      });
    });



    console.log(form);
    res.send(form);
  }

//Permission

//Session handlers
  exports.login = function ( req, res ) {
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

  exports.checkGetAccess = function ( req, res, next ) {
    var pathArray = req.route.path.split('/'),
        index = 0,
        accessFlag = false;

    var condition = {
      username: req.user.username
    };

    var query = schemas.permissions.findOne( condition );

    query.select('-_id -__v -username').exec( function ( err, permission ) {
      index = matchSchemaToPermission( permission.permissions, pathArray );

      permission.permissions[index].actions.some( 
        function ( element ) {
          if ( element.what === 'read' ) {
            accessFlag = element.value;
            return true;
          }
        });

      if ( accessFlag ) {
        next();
      } else {
        res.render( 'special/no_access', { 
          currentUser : req.user.username
        });
      }
    });
  }

  exports.checkPostAccess = function ( req, res, next ) {
    var pathArray   = [req.params.schema],
        path        = req.route.path,
        index       = 0,
        transaction = '',
        accessFlag  = false;

    var condition = {
      username: req.user.username
    }; 

    switch ( req.params.schema ) {
      case 'employmentsTrees':
        pathArray = ['employments'];
        break;
      case 'users':
        pathArray = ['employees'];
        break;
    }

    var query = schemas.permissions.findOne( condition );

    switch ( true ) {
      case /data/.test(path):
        transaction = 'read';
        break;
      case /new/.test(path):
        transaction = 'write';
        break;
      case /update/.test(path):
        transaction = 'modify'
        break;
    }
    query.select('-_id -__v -username').exec( function ( err, permission ) {
      index = matchSchemaToPermission( permission.permissions, pathArray );

      permission.permissions[index].actions.some( function ( action ) {
          if ( action.what === transaction ) {
            accessFlag = action.value;
            return true;
          }
        });

      if ( accessFlag ) {
        next();
      } else {
        res.send({ access: 'denied' });
      }
    });
  }

/** Utility stuff */
function getOperationDate () {
  var operationDate = new Date(),
      day = operationDate.getDate(),
      month = operationDate.getMonth() + 1,
      year = operationDate.getFullYear();

  if ( day < 10 ) { 
    day = '0' + day
  }

  if ( month < 10 ) { 
    month= '0'+ month
  } 

  operation = day + '/' + month + '/' + year;

  var hour = operationDate.getHours(),
    minute = operationDate.getMinutes();

  return operation + ' @ ' + hour + ':' + minute;
}

function matchSchemaToPermission ( permissions, pathArray ) {
  var index = -1,
      matchFlag = false;

  permissions.some( function ( permission, permissionIndex ) {
    pathArray.some( function ( pathElement, pathIndex ) {
      if ( pathElement === permission.module ) {
        index = permissionIndex;
        matchFlag = true;
        return true;
      }
    });
    return matchFlag;
  });

  return index;
}
