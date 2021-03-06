function talentController ( scope, employee, users ) {
  scope.employee = {
    username: '',
    name: '',
    mail: '',
    last_father_name: '',
    last_mother_name: '',
    date_of_birth: '',
    address: '',
    phone: ''
  };

  scope.user = {
    username: '',
    password: '',
  };

  scope.confirmation = '';

  employee.getEmployees().success( function ( data ) {
    scope.employees = data;
  });

  scope.talentPreview = function () {
    scope.modal = this.employee;
  };

  scope.saveTalent = function () {
    var params = {};

    scope.employee.username = scope.user.username;

    users.getOneUser( scope.employee ).
      success( function ( data ) {
        if ( data ) {
          alert( 'Usuario ya existe' );
          scope.user.username = '';
        } else {
            params.employee = scope.employee;
            params.user = scope.user;

            users.saveUser( params ).
              success( function (data) {
                alert( 'Usuario creado' );
              }).
              error();
            
            employee.saveTalent(params).
              success( function (data) {
                alert('Employee creado');
              }).
              error();
            
            scope.employee = {
              name: '',
              last_father_name: '',
              last_mother_name: '',
              date_of_birth: '',
              address: ''
            };

            scope.user = {
              username: '',
              password: ''
            };
        }
      }).
      error();
  };
}
