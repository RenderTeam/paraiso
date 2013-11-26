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

var queries = require('./mongo-queries');

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
//Control Panel
  app.get( '/control_panel', queries.privateContent, queries.log, routes.control_panel );
//Index
  app.get( '/', routes.index );
//Forms
  app.get( '/forms/new_form', routes.new_form );
//Organizational Structure
  app.get( '/organizational_structure/talent_management', 
    queries.privateContent, routes.talent_management );
//Resources
  app.get( '/resources', queries.privateContent, routes.resources );
//Tasks
  app.get( '/tasks/new_task', queries.privateContent, routes.new_task );
  app.get( '/tasks/my_tasks', queries.privateContent, routes.my_tasks );
  app.get( '/tasks/tasks', queries.privateContent, routes.tasks );

// POST
  app.post( '/getOneTask', queries.privateContent, queries.getOneTask );
  app.post( '/getTasks', queries.privateContent, queries.getTasks );
  app.post( '/getTasksFromUser', queries.privateContent, 
    queries.getTasksFromUser );
  app.post( '/getUsersNames', queries.privateContent, queries.getUsersNames );

  app.post( '/login', queries.login );
  app.post( '/logout', queries.logout);
  app.post( '/saveUser', queries.privateContent, queries.saveUser );
  app.post( '/saveTask', queries.privateContent, queries.saveTask );

  app.post( '/createForm', queries.createForm );

http.createServer( app ).listen( config.port, function () {
    console.log( 'Express server listening on port ' + config.port );
});