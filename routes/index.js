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
//Documentation
  exports.documentation = function  ( req, res) {
    res.render('documentation/documentation' , {
      controller: 'DocumentationController' ,
      currentUser : req.user.username
    });
  }

//Extras
  exports.send_mail = function( req, res ){
    res.render('extras/send_mail', { 
      currentUser : req.user.username,
      controller  : 'MailController'
    });
  };

//Dashboard
  
  exports.dashboard = function ( req, res ) {
    res.render( 'dashboard/dashboard', {
      currentUser : req.user.username
    });
  }

//Forms Generator

  exports.newCustomForm = function ( req, res ) {
    res.render( 'forms-generator/custom', {
      currentUser : req.user.username
    });
  }

//Index
  exports.index = function ( req, res ) {
    res.render('index', { 
      controller: 'LoginController' 
    });
  };
//Organizational Structure
  //Departments
    exports.departments = function( req, res){
      res.render('organizational_structure/departments/departments', {
        controller : 'DepartmentsController',
        currentUser : req.user.username
      });
    };
    exports.departments_chart = function( req, res){
      res.render('organizational_structure/departments/departments_chart', {
        controller : 'DepartmentsChartController',
        currentUser : req.user.username
      });
    };
  //Employments
    exports.employments_management = function( req, res){
      res.render('organizational_structure/employments/employments_management', {
        controller: 'EmploymentsController', 
        currentUser : req.user.username
      });
    };
    exports.employments_tree = function( req, res){
      res.render('organizational_structure/employments/employments_tree', {
        controller: 'EmploymentsTreeController', 
        currentUser : req.user.username
      });
    };
  //Talent
  exports.talent_management = function( req, res ){
    res.render('organizational_structure/talent/talent_management', {
      controller: 'TalentController', 
      currentUser : req.user.username
    });
  };
  exports.talent_management_profile = function( req, res ){
    res.render('organizational_structure/talent/talent_management_profile', {
      controller:   'TalentProfileController',
      currentUser:  req.user.username,
      username:     req.params.employee
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