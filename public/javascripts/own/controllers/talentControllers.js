var talentAppModule  = angular.module( 'talentApp',
  [ 'services.talent', 'services.users' ] );

talentAppModule.controller( 'TalentController', talentController );

talentController.$inject = [ '$scope', 'Talent', 'Users' ];
function talentController ( scope, talent, users ) {
  scope.employee = {
    username: '',
    name: '',
    mail: '',
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

    scope.employee.age = calculateAge( new Date(scope.employee.date_of_birth) );
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

/**
 * Calculates age
 * @param { birthDate (Date) } The Date object that represents the bithdate to 
    calculate.
 * @return { age (Number) } The age today
 */
function calculateAge( birthDate ) {

  var age = 0,
      today = new Date(),

  age = today.getFullYear() - birthDate.getFullYear();

  if ( ( today.getMonth() < birthDate.getMonth() ) || 
    ( today.getMonth() === birthDate.getMonth() && 
      today.getDate() < birthDate.getDate() ) ) {
    age--;
  }
  
  return age;
};