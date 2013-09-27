
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
  res.render('tasks', { title: 'Paraíso' });
};
