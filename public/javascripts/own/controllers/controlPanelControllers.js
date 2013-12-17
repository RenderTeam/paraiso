var controlPanelAppModule  = angular.module('controlPanelApp',
  ['services.permissions']);

controlPanelAppModule.controller('PermissionsController', permissionsController);

permissionsController.$inject = [ '$scope', 'Permission' ];
function permissionsController( scope, permission ){

  scope.permission = {};
  scope.temporal = {};

  permission.getAllPermissionsStatus().
    success( function ( data ) {
      scope.permissions =  data;
    }).
    error();

  scope.getPermissions = function () {
    permission.getOnePermission( this.permission ).
      success( function ( data ) {
        scope.permission = data;

        scope.temporal.tasks = convertPermissionListToArray(data.tasks.can);
        scope.temporal.employees = convertPermissionListToArray(data.employees.can);
        scope.temporal.control_panel = convertPermissionListToArray(data.control_panel.can);
        scope.temporal.departments = convertPermissionListToArray(data.departments.can);
      }).
      error();
  }

  scope.checkStatus = function ( where ) {
    if( !scope.permission.hasOwnProperty( where ) ) {
      scope.permission[where] = {
        status: null
      }
    }

    switch ( scope.permission[where].status ) {
      case 'danger':
      case 'warning':
      default:
        return false;
      break;
      case 'success':
        return true;
      break;
    }
  }
}

function convertPermissionListToArray ( list ) {
  var permissions = [],
      permission;
  for ( permission in list ){
    permissions.push( {
      field: permission,
      value: list[permission]
    });
  }

  return permissions;
}