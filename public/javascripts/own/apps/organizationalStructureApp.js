var organizationalStructureAppModule = angular.module( 'organizationalStructureApp',
  [ 'services.employee', 'services.employment', 'services.users' ] );

departmentsController.$inject = [ '$scope' ];
organizationalStructureAppModule.controller( 'DepartmentsController',
  departmentsController );

employmentsController.$inject = [ '$scope', 'Employment' ];
organizationalStructureAppModule.controller( 'EmploymentsController',
  employmentsController );

talentController.$inject = [ '$scope', 'Employee', 'Users' ];
organizationalStructureAppModule.controller( 'TalentController', talentController );

talentProfileController.$inject = [ '$scope', 'Employee', 'Users' ];
organizationalStructureAppModule.controller( 'TalentProfileController', 
  talentProfileController );