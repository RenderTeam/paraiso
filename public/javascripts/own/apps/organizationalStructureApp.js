var organizationalStructureAppModule = angular.module( 'organizationalStructureApp',
  [ 'services.employee', 'services.employment', 'services.tree', 
    'services.users', 'services.departments' ] );

departmentsController.$inject = [ '$scope', 'Departments' ];
organizationalStructureAppModule.controller( 'DepartmentsController', 
  departmentsController );

departmentsChartController.$inject = [ '$scope', 'Departments', 'Employment',
 'EmploymentTree' ];
organizationalStructureAppModule.controller( 'DepartmentsChartController', 
  departmentsChartController );

employmentsController.$inject = [ '$scope', 'Employment', 'Departments' ];
organizationalStructureAppModule.controller( 'EmploymentsController',
  employmentsController );

employmentsTreeController.$inject = [ '$scope', 'EmploymentTree' ];
organizationalStructureAppModule.controller( 'EmploymentsTreeController',
  employmentsTreeController );

talentController.$inject = [ '$scope', 'Employee', 'Users' ];
organizationalStructureAppModule.controller( 'TalentController', 
  talentController );

talentProfileController.$inject = [ '$scope', 'Employee', 'Users' ];
organizationalStructureAppModule.controller( 'TalentProfileController', 
  talentProfileController );