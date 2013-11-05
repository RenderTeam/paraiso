mongoHelper = require('.././mongo-queries.js');

exports.control_panel = function ( req, res ) {
    var currentUser = mongoHelper.getUserInfo( req );

  res.render('control_panel/control_panel',
              { title: 'Paraíso', controller: 'NewUserController',
                currentUser : currentUser });
}

exports.index = function ( req, res ) {
  res.render('index', 
              { title: 'Paraíso', controller: 'LoginController' });
};

exports.my_tasks = function ( req, res ) {
  var currentUser = mongoHelper.getUserInfo( req );
  res.render('tasks/tasks',
              { title: 'Paraíso', controller: 'MyTasksController',
                currentUser : currentUser });
};

exports.new_task = function ( req, res ) {
  var currentUser = mongoHelper.getUserInfo( req );
  res.render('tasks/new_task', 
              { title: 'Paraíso', controller: 'NewTaskController',
                currentUser : currentUser });
};

exports.talent_management = function ( req, res ) {
  var currentUser = mongoHelper.getUserInfo( req );
  res.render('organizational_structure/talent_management',
              { title: 'Paraíso', currentUser : currentUser });
};

exports.viewresources = function ( req, res ) {
  var currentUser = mongoHelper.getUserInfo( req );
  res.render('resources/resources',
              { title: 'ParaísoResourcesTest', currentUser : currentUser });
};

exports.tasks = function ( req, res ) {
  var currentUser = mongoHelper.getUserInfo( req );
  res.render('tasks/tasks', 
            { title: 'Paraíso', controller: 'TasksController',
            currentUser : currentUser });
};