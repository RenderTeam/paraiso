function departmentsController ( scope, department){
  scope.department = {
    name: ''
  };

  //Agregar el getDepartment
  //Save Deparments

  department.getDepartments().success( function ( data ) {
    scope.departments = data;
  });

  scope.saveDepartments = function () {
    var params = {};
      params.department = scope.department;
      params.user = scope.user;

      department.saveDepartments(params).
        success( function (data) {
          alert('More CHelas PLis creado');
        }).
        error();
            
      scope.department = {
        name: '',
      };
  };
}