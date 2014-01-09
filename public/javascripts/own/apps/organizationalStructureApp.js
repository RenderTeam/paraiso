var organizationalStructureAppModule = angular.module( 'organizationalStructureApp',
  [ 'services.employee', 'services.users' ] );

departmentsController.$inject = [ '$scope' ];
organizationalStructureAppModule.controller( 'DepartmentsController',
  departmentsController );

talentController.$inject = [ '$scope', 'Employee', 'Users' ];
organizationalStructureAppModule.controller( 'TalentController', talentController );

talentProfileController.$inject = [ '$scope', 'Employee', 'Users' ];
organizationalStructureAppModule.controller( 'TalentProfileController', 
  talentProfileController );