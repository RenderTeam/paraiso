function departmentsController ( scope, department ){
  scope.department = {
    name: ''
  };

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
        alert('El departamento se creó correctamente.');
      }).
      error();

    scope.department = {
      name: '',
    };
  };
}