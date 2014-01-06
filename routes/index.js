//Control Panel
  exports.control_panel = function ( req, res ) {
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
//Forms Generator
  exports.create_form = function ( req, res ) {
    res.render('forms_generator/custom_form', {
      currentUser : req.user.username
    });
  };
//Index
  exports.index = function ( req, res ) {
    res.render('index', { 
      controller: 'LoginController' 
    });
  };
//Organizational Structure
  exports.departments = function( req, res){
    res.render('organizational_structure/departments', {
      currentUser : req.user.username
    });
  };
  //Employments
    exports.employments_management = function( req, res){
      res.render('organizational_structure/employments/employments_management', {
        currentUser : req.user.username
      });
    };
    exports.employments_tree = function( req, res){
      res.render('organizational_structure/employments/employments_tree', {
        currentUser : req.user.username
      });
    };
  exports.talent_management = function( req, res ){
    res.render('organizational_structure/talent_management', {
      controller: 'TalentController', 
      currentUser : req.user.username
    });
  };
//Resources
  exports.resources = function (req, res) {
    res.render('resources/resources',{
      currentUser : req.user.username
    });
  };
//Tasks
  exports.my_tasks = function ( req, res ) {
    res.render('tasks/tasks', { 
      controller: 'MyTasksController',
      currentUser : req.user.username
    });
  };
  exports.new_task = function ( req, res ) {
    res.render('tasks/new_task', { 
      controller: 'NewTaskController',
      currentUser : req.user.username
    });
  };
  exports.tasks = function ( req, res ) {
    res.render('tasks/tasks', { 
      controller: 'TasksController',
      currentUser : req.user.username
    });
  };