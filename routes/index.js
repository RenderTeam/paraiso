
exports.control_panel = function ( req, res ) {
  res.render('control_panel/control_panel',
              { title: 'Paraíso', controller: 'NewUserController' });
}

exports.index = function ( req, res ) {
  res.render('index', 
              { title: 'Paraíso', controller: 'LoginController' });
};

exports.my_tasks = function ( req, res ) {
  res.render('tasks/tasks',
              { title: 'Paraíso', controller: 'MyTasksController' });
};

exports.new_task = function ( req, res ) {
  res.render('tasks/new_task', 
              { title: 'Paraíso', controller: 'NewTaskController' });
};

exports.talent_management = function ( req, res ) {
  res.render('organizational_structure/talent_management',
              { title: 'Paraíso' });
};

exports.viewresources = function ( req, res ) {
  res.render('resources/resources',
              { title: 'ParaísoResourcesTest' });
};

exports.tasks = function ( req, res ) { 
  res.render('tasks/tasks', 
            { title: 'Paraíso', controller: 'TasksController'});
};