function employmentsController ( scope, employment ) {
  scope.father = {
    name: ''
  };

  employment.getEmployments().success( function ( data ) {
    scope.employments = data;
  } );

  scope.saveEmployment = function () {
    var params = {
      father: scope.father.name,
      employment: scope.employment
    }

    employment.saveEmployment( params ).
      success( function ( data ) {
        scope.employment.employment = '';
        scope.father.employment = '';
      }).
      error();
  }
}