
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

exports.new_talent = function(req, res){
  res.render('organizational_structure/new_talent', { title: 'Paraíso' });
};

