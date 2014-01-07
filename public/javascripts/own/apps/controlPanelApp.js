var controlPanelAppModule  = angular.module('controlPanelApp',
  ['services.permissions']);

permissionsController.$inject = [ '$scope', 'Permission' ];
controlPanelAppModule.controller('PermissionsController', permissionsController);