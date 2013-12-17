var controlPanelAppModule  = angular.module('controlPanelApp',
  ['services.permissions']);

controlPanelAppModule.controller('PermissionsController', permissionsController);

permissionsController.$inject = [ '$scope', 'Permission' ];
function permissionsController( scope, permission ){

  scope.permission = {};
  scope.temporal = {};

  permission.getAllPermissionsStatus().
    success( function ( data ) {
      console.log( data );
      scope.permissions = data;
    }).
    error();

  scope.getPermissions = function () {
    permission.getOnePermission( this.permission ).
      success( function ( data ) {
        scope.permission = data;
      }).
      error();
  }

  scope.checkStatus = function ( status ) {
    flag = status === 'success' ? true:false;
    return flag;
  }
}