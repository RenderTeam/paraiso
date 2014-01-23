/*
 * Module dependencies.
 */

var config      = require('./config')(),
    express     = require('express'),
    http        = require('http'),
    mongoStore  = require('connect-mongo')(express),
    path        = require('path')
    routes      = require('./routes');

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
app.use( express.session({  
    store: new mongoStore({
        url: 'mongodb://localhost:27017/test',
        maxAge: new Date( Date.now() + 60000 )
    }),
    secret: 'Y0l0SW4G-F4RR0SW4G-T0UGHL1FECH00S3M3-H4RDC0R3'
}));

app.use( express.methodOverride() );
app.use( app.router );
app.use( require('less-middleware')
({
    src: __dirname + '/public'
}));
app.use( express.static( path.join( __dirname, 'public') ) );

// development only
if ( 'development' == app.get('env') ) {
    app.use( express.errorHandler() );
}

var getMiddlewares = [ queries.privateContent, queries.checkGetAccess ];
var postMiddlewares = [ queries.privateContent, queries.checkPostAccess ];

// GET
// Control Panel
app.get( '/control-panel/permissions', queries.privateContent,
routes.permissions );
//Extras
app.get( '/extras/send_mail', queries.privateContent, routes.send_mail );
// Index
app.get( '/', routes.index );
// Forms Generator
app.get( '/forms_generator/custom_form',
queries.privateContent, routes.create_form );
// Organizational Structure
  //Departments
  app.get( '/organization/departments/management', getMiddlewares,
    routes.departments );
  app.get( '/organization/departments/chart',
    getMiddlewares, routes.departments_chart );
  //Employments
  app.get( '/organization/employments/management', getMiddlewares, 
    routes.employments_management );
  app.get( '/organization/employments/tree', getMiddlewares, routes.employments_tree );
  //Talent
  app.get( '/organization/employees/management', getMiddlewares, 
    routes.talent_management );
  app.get( '/organization/employees/:employee', getMiddlewares, 
    routes.talent_management_profile );
// Resources
app.get( '/resources', queries.privateContent, routes.resources );
// Tasks
app.get( '/tasks/new', queries.privateContent, routes.new_task );
app.get( '/tasks/own', getMiddlewares, routes.my_tasks );
app.get( '/tasks/all', getMiddlewares, routes.tasks );

// POST
  //All
  app.post( '/all/:schema/data', postMiddlewares, queries.getAll );
  app.post( '/all/:schema/:filter/data', queries.privateContent, queries.getAllFiltered );

  //Single
  app.post( '/single/:schema/data', postMiddlewares, queries.getOne );
  app.post( '/single/:schema/:filter/data', queries.privateContent, 
    queries.getOneFiltered );
  app.post( '/getSmallEmploymentsTree', queries.privateContent, 
    queries.getSmallEmploymentsTree );
  app.post( '/getEmploymentsTree', queries.privateContent, 
    queries.getEmploymentsTree );

  //New
  app.post( '/:schema/:reference/new', postMiddlewares, queries.save );
  // app.post( '/saveTask', postMiddlewares, queries.saveTask );
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