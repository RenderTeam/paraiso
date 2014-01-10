function departmentsController ( scope. department,){
  scope.department = {
    name: ''
  };

  scope.confirmation = '';

  //Agregar el getDepartment
  //Save Deparments

  department.getDepartments().success( function ( data ) {
    scope.departments = data;
  });

}