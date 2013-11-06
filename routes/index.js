
exports.control_panel = function ( req, res ) {
  res.render('control_panel/control_panel',
              { title: 'Paraíso', controller: 'NewUserController',
                currentUser : req.user.username });
}

exports.index = function ( req, res ) {
  res.render('index', 
              { title: 'Paraíso', controller: 'LoginController' });
};

exports.my_tasks = function ( req, res ) {
  res.render('tasks/tasks',
              { title: 'Paraíso', controller: 'MyTasksController',
                currentUser : req.user.username });
};

exports.new_task = function ( req, res ) {
  res.render('tasks/new_task', 
              { title: 'Paraíso', controller: 'NewTaskController',
                currentUser : req.user.username });
};

exports.talent_management = function ( req, res ) {
  res.render('organizational_structure/talent_management',
              { title: 'Paraíso', currentUser : req.user.username });
};

exports.viewresources = function ( req, res ) {
  res.render('resources/resources',
              { title: 'ParaísoResourcesTest',
                currentUser : req.user.username });
};

exports.tasks = function ( req, res ) {
  res.render('tasks/tasks', 
            { title: 'Paraíso', controller: 'TasksController',
            currentUser : req.user.username });
};