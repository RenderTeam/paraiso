function employmentsController ( scope, employment, departments ) {
  scope.father = {
    name: ''
  };

  scope.department = {
    name: ''
  };

  employment.getEmployments().
    success( function ( data ) {
      scope.employments = data;
    } ).
    error();

  departments.getDepartments().
    success( function ( data ) {
      scope.departments = data;
    }).
    error();

  scope.saveEmployment = function () {
    scope.employment.department = scope.department.name;
    console.log( scope.employment );
    var params = {
      father: scope.father.name,
      employment: scope.employment,
    }

    employment.saveEmployment( params ).
      success( function ( data ) {
        scope.employment.employment = '';
        scope.father.employment = '';
        alert('El puesto se creó correctamente.');
      }).
      error();
  }
}