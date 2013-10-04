/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Paraíso' });
};

exports.short_name = function(req, res){
  res.render('short_name', { title: 'Paraíso' });
};

exports.talent_management = function(req, res){
  res.render('organizational_structure/talent_management', { title: 'Paraíso' });
};

exports.tasks = function(req, res){
  res.render('tasks/tasks', { title: 'Paraíso', 
                              controller: 'TasksController' });
};

exports.my_tasks = function(req, res){
  res.render('tasks/tasks', { title: 'Paraíso', 
                              controller: 'MyTasksController' });
};

exports.new_task = function(req, res){
  res.render('tasks/new_task', {  title: 'Paraíso',
                                  controller: 'NewTaskController'});
};