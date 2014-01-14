function departmentsController ( scope, department ){
  scope.department = {
    name: ''
  };

  //Agregar el getDepartment
  //Save Deparments

  department.getDepartments().
    success( function ( data ) {
      scope.departments = data;
    }).
    error();

  scope.saveDepartment = function () {
    var params = {
      department: scope.department
    };

    department.saveDepartment( params ).
      success( function (data) {
        alert('More CHelas PLis creado');
      }).
      error();

    scope.department = {
      name: '',
    };
  };
}