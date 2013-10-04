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
  res.render('tasks/tasks', { title: 'Paraíso' });
};

exports.partialTasks = function(req, res){
  res.render('tasks/tasks/partials/tasks', { title: 'Paraíso' });
};

exports.partialNewTask = function(req, res){
  res.render('tasks/tasks/partials/new_task', { title: 'Paraíso' });
};