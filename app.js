/*
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

/*
 * Mongo queries and management is on mongo-queries.js
 */

var queries = require('./mongo-queries');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/control_panel', routes.control_panel);
app.get('/organizational_structure/talent_management', routes.talent_management);
app.get('/tasks/tasks', routes.tasks);
app.get('/tasks/my_tasks', routes.my_tasks);
app.get('/tasks/new_task', routes.new_task);
app.get('/users', user.list);

app.get('/resources', routes.viewresources);

app.post('/getOneTask', queries.getOneTask);
app.post('/getTasks', queries.getTasks);
app.post('/getTasksFromUser', queries.getTasksFromUser);
app.post('/getUsersNames', queries.getUsersNames);

app.post('/login', queries.login);
app.post('/saveUser', queries.saveUser);
app.post('/saveTask', queries.saveTask);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});