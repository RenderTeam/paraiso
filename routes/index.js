//Control Panel
  exports.control_panel = function( req, res ){
    res.render('control_panel/control_panel', { controller: 'NewUserController' });
  }
//Index
  exports.index = function( req, res ){
    res.render('index', { controller: 'LoginController' });
  };
//Forms
  exports.new_form = function( req, res) {
    res.render('forms/new_form', {});
  };
//Organizational Structure
  exports.talent_management = function( req, res ){
    res.render('organizational_structure/talent_management', {});
  };
//Resources
  exports.viewresources = function(req, res){
    res.render('resources/resources',{});
  };
//Tasks
  exports.my_tasks = function( req, res ){
    res.render('tasks/tasks', { controller: 'MyTasksController' });
  };

  exports.new_task = function( req, res ){
    res.render('tasks/new_task', { controller: 'NewTaskController'});
  };

  exports.tasks = function( req, res ){
    res.render('tasks/tasks', { controller: 'TasksController' });
  };