//Control Panel
exports.control_panel = function ( req, res ) {
  res.render('control_panel/control_panel', { 
    controller: 'NewUserController' ,
    //currentUser : req.user.username
  });
};
//Forms Generator
  exports.create_form = function ( req, res ) {
    res.render('custom_form', {
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
  exports.talent_management = function ( req, res ) {
    res.render('organizational_structure/talent_management', {
      currentUser : req.user.username
    });
  };

  exports.departments = function ( req, res) {
    res.render('organizational_structure/departments', {
      currentUser : req.user.username
    });
  };

  exports.employments = function ( req, res) {
    res.render('organizational_structure/employments', {
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
