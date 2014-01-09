/*
 * Module dependencies.
 */

var express     = require('express'),
    config      = require('./config')(),
    routes      = require('./routes'),
    mongoStore  = require('connect-mongo')( express ),
    http        = require('http'),
    path        = require('path');

var app = express();

/*
 * Mongo queries and management is on mongo-queries.js
 */

var queries = require('./mongo-queries'),
    mail    = require('./send-mail-utilities');


// all environments
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );
app.locals.pretty = true;
//app.locals.pretty = false; //production mode.
app.use( express.logger('dev') );
//app.use( express.bodyParser() ); bodyParser deprecated, now json && urlenconded
app.use( express.json() );
app.use( express.urlencoded() );
app.use( express.cookieParser() );
app.use( express.session( {
  store: new mongoStore( {
    url: 'mongodb://localhost:27017/test',
    maxAge: new Date( Date.now() + 60000 )
  }),
  secret: 'Y0l0SW4G-F4RR0SW4G-T0UGHL1FECH00S3M3-H4RDC0R3'
}));

app.use( express.methodOverride() );
app.use( app.router );
  app.use( require('less-middleware')
    ( { src: __dirname + '/public' } ) );
app.use( express.static( path.join( __dirname, 'public') ) );

// development only
if ( 'development' == app.get('env') ) {
  app.use( express.errorHandler() );
}

// GET
// Control Panel
  app.get( '/control_panel', queries.privateContent,queries.log,  routes.control_panel );
  app.get( '/control_panel/permissions', queries.privateContent,queries.log,  
    routes.permissions );
//Extras
  app.get( '/extras/send_mail', queries.privateContent,queries.log,  routes.send_mail );
// Index
  app.get( '/', routes.index );
// Forms Generator
    app.get( '/forms_generator/custom_form', 
      queries.privateContent,queries.log,  routes.create_form );
// Organizational Structure
  app.get('/organizational_structure/departments',
    queries.privateContent,queries.log,  routes.departments);
  //Employments
    /*
     * Default route for /organizational_structure/employments
     */
    app.get( '/organizational_structure/employments', 
      queries.privateContent,queries.log,  routes.employments_management);
    app.get( '/organizational_structure/employments/employments_management', 
      queries.privateContent,queries.log,  routes.employments_management);
    app.get( '/organizational_structure/employments/employments_tree', 
      queries.privateContent,queries.log,  routes.employments_tree);
  //Talent
  app.get( '/organizational_structure/talent_management', 
    queries.privateContent,queries.log,  routes.talent_management );

  app.get( '/organizational_structure/talent_management/:employee', 
    queries.privateContent,queries.log,  routes.talent_management_profile );
// Resources
  app.get( '/resources', queries.privateContent,queries.log,  routes.resources );
// Tasks
  app.get( '/tasks/new_task', queries.privateContent,queries.log,  routes.new_task );
  app.get( '/tasks/my_tasks', queries.privateContent,queries.log,  routes.my_tasks );
  app.get( '/tasks/tasks', queries.privateContent,queries.log,  routes.tasks );

// POST
  //Employees
  app.post( '/getEmployees', queries.privateContent,queries.log,  queries.getEmployees );
  app.post( '/saveEmployee', queries.privateContent,queries.log,  queries.saveEmployee );
  //Permissions
  app.post( '/getAllPermissionsStatus', queries.privateContent,queries.log,  
    queries.getAllPermissionsStatus );
  app.post( '/getOnePermission', queries.privateContent,queries.log,  
    queries.getOnePermission );
  app.post( '/updatePermission', queries.privateContent,queries.log,  
    queries.updatePermission );
  //Tasks
  app.post( '/getOneTask',  queries.privateContent,queries.log, 
                            queries.log,
                            queries.getOneTask );
  //Extras
  app.post( '/sendMail', queries.privateContent,queries.log,  mail.sendMail );
  app.post( '/getTasks', queries.privateContent,queries.log,  queries.getTasks );
  app.post( '/getTasksFromUser', queries.privateContent,queries.log,  
    queries.getTasksFromUser );
  app.post( '/saveTask', queries.privateContent,queries.log,  queries.saveTask );

  //Session
  app.post( '/login', queries.login );
  app.post( '/logout', queries.logout);
  
  //Users
  app.post( '/getOneUser', queries.privateContent,queries.log,  queries.getOneUser );
  app.post( '/getUsersNames', queries.privateContent,queries.log,  queries.getUsersNames );
  app.post( '/saveUser', queries.privateContent,queries.log,  queries.saveUser );

  app.post( '/createForm', queries.createForm );

http.createServer( app ).listen( config.port, function () {
  console.log( 'Express server listening on port ' + config.port );
});