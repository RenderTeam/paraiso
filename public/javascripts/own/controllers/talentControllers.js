var talentAppModule  = angular.module( 'talentApp',
  [ 'services.talent', 'services.users' ] );

talentAppModule.controller( 'TalentController', talentController );

talentController.$inject = [ '$scope', 'Talent', 'Users' ];
function talentController ( scope, talent, users ) {
  scope.employee = {
    username: '',
    name: '',
    last_father_name: '',
    last_mother_name: '',
    date_of_birth: '',
    address: ''
  };

  scope.user = {
    username: '',
    password: '',
  };

  scope.confirmation = '';

  talent.getAllTalent().success( function ( data ) {
    scope.employees = data;
  });

  scope.talentPreview = function () {
    console.log(this);

    talent.getPreview( params ).
      success().
      error();
  };

  scope.saveTalent = function () {
    var params = {};

    scope.employee.age = 19;
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
            
            talent.saveTalent(params).
              success( function (data) {

                alert('nice');
              }).
              error();
            
            scope.employee = {
              username: '',
              name: '',
              last_father_name: '',
              last_mother_name: '',
              date_of_birth: '',
              address: ''
            };
        }
      }).
      error();
  };
}