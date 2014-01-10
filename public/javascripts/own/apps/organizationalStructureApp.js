var organizationalStructureAppModule = angular.module( 'organizationalStructureApp',
  [ 'services.employee', 'services.users', 'services.departments' ] );

talentController.$inject = [ '$scope', 'Employee', 'Users' ];
organizationalStructureAppModule.controller( 'TalentController', talentController );

talentProfileController.$inject = [ '$scope', 'Employee', 'Users' ];
organizationalStructureAppModule.controller( 'TalentProfileController', 
  talentProfileController );

departmentsController.$inject = [ '$scope', 'Departments', 'Users' ];
organizationalStructureAppModule.controller( 'DepartmentsController', 
  departmentsController );