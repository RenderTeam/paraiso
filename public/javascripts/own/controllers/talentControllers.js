var talentAppModule  = angular.module( 'talentApp',
  [ 'services.talent' ] );

talentAppModule.controller( 'TalentController', talentController );

talentController.$inject = [ '$scope', 'Talent' ];
function talentController ( scope, talent ) {
  scope.employee = {
    user: '',
    name: '',
    last_father_name: '',
    last_mother_name: '',
    date_of_birth: '',
    address: ''
  };

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

    scope.employee.age = 10;

    params.employee = scope.employee;

    talent.saveTalent(params).
      success( function (data) {
        scope.employee = {
          user: '',
          name: '',
          last_father_name: '',
          last_mother_name: '',
          date_of_birth: '',
          address: ''
        };

        alert('nice');
      }).
      error();
  };
}