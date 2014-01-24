/*
 * Module dependencies.
 */

var express     = require('express'),
    config      = require('./config')(),
    routes      = require('./routes'),
    mongoStore  = require('connect-mongo')( express ),
    http        = require('http'),
    path        = require('path');
//THis is for the upload of Documents
    querystring = require("querystring");
    formidable = require("formidable");
    fs = require ("fs");

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
  app.get( '/control_panel', queries.privateContent, routes.control_panel );
  app.get( '/control_panel/permissions', queries.privateContent, 
    routes.permissions );
// Documents
  app.get( '/documentation', queries.privateContent, routes.documentation);
  app.get( '/documentation/documents' , queries.privateContent, routes.documents);
//Extras
  app.get( '/extras/send_mail', queries.privateContent, routes.send_mail );
// Index
  app.get( '/', routes.index );
// Forms Generator
    app.get( '/forms_generator/custom_form', 
      queries.privateContent, routes.create_form );
// Organizational Structure
  //Departments
  app.get('/organizational_structure/departments/departments', queries.privateContent, 
    routes.departments);
  app.get('/organizational_structure/departments/departments_chart', 
    queries.privateContent, routes.departments_chart);
  //Employments
    app.get( '/organizational_structure/employments', 
      queries.privateContent, routes.employments_management);
    app.get( '/organizational_structure/employments/employments_management', 
      queries.privateContent, routes.employments_management);
    app.get( '/organizational_structure/employments/employments_tree', 
      queries.privateContent, routes.employments_tree);
  //Talent
  app.get( '/organizational_structure/talent_management', 
    queries.privateContent, routes.talent_management );
  app.get( '/organizational_structure/talent_management/:employee', 
    queries.privateContent, routes.talent_management_profile );
// Resources
  app.get( '/resources', queries.privateContent, routes.resources );
// Tasks
  app.get( '/tasks/new_task', queries.privateContent, routes.new_task );
  app.get( '/tasks/my_tasks', queries.privateContent, routes.my_tasks );
  app.get( '/tasks/tasks', queries.privateContent, routes.tasks );

// POST
  //All
  app.post( '/all/:schema/:filter/data', queries.privateContent, queries.getAll );

  //Single
  app.post( '/single/:schema/:filter/data', queries.privateContent, queries.getOne );
  app.post( '/getEmploymentsTree', queries.privateContent, 
    queries.getEmploymentsTree );
  app.post( '/getSmallEmploymentsTree', queries.privateContent, 
    queries.getSmallEmploymentsTree );

  //New
  app.post( '/:schema/:reference/new', queries.privateContent, queries.save );
  app.post( '/saveTask', queries.privateContent, queries.saveTask );
  app.post( '/saveEmployment', queries.privateContent, 
    queries.updateEmploymentsTree, queries.saveEmployment );

  //Update
  app.post( '/:schema/:document/:filter/update', queries.privateContent, 
    queries.update );

  //Extras
  app.post( '/sendMail', queries.privateContent, mail.sendMail );

  //Session
  app.post( '/login', queries.login );
  app.post( '/logout', queries.logout);
  
  //Users
  app.post( '/createForm', queries.createForm );

http.createServer( app ).listen( config.port, function () {
  console.log( 'Express server listening on port ' + config.port );
});