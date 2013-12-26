//Control Panel
exports.control_panel = function( req, res ){
  res.render('control_panel/control_panel', { 
    controller: 'NewUserController' ,
    currentUser : req.user.username
  });
};
exports.permissions = function( req, res ){
  res.render('control_panel/permissions', { 
    controller: 'PermissionsController' ,
    currentUser : req.user.username
  });
};
//Extras
exports.send_mail = function( req, res ){
  res.render('extras/send_mail', { 
    currentUser : req.user.username,
    controller  : 'MailController'
  });
};
//Index
exports.index = function( req, res ){
  res.render('index', { 
    controller: 'LoginController' 
  });
};
//Forms
exports.new_form = function( req, res) {
  res.render('forms/new_form', { controller: 'NewFormController' });
};
//Organizational Structure
exports.talent_management = function( req, res ){
  res.render('organizational_structure/talent_management', {
    controller: 'TalentController', 
    currentUser : req.user.username
  });
};

exports.departments = function( req, res){
  res.render('organizational_structure/departments', {
    currentUser : req.user.username
  });
};

exports.employments = function( req, res){
  res.render('organizational_structure/employments', {
    currentUser : req.user.username
  });
};
//Resources
exports.resources = function(req, res){
  res.render('resources/resources',{
    currentUser : req.user.username
  });
};
//Tasks
exports.my_tasks = function( req, res ){
  res.render('tasks/tasks', { 
    controller: 'MyTasksController',
    currentUser : req.user.username
  });
};

exports.new_task = function( req, res ){
  res.render('tasks/new_task', { 
    controller: 'NewTaskController',
    currentUser : req.user.username
  });
};

exports.tasks = function( req, res ){
  res.render('tasks/tasks', { 
    controller: 'TasksController',
    currentUser : req.user.username
  });
};
