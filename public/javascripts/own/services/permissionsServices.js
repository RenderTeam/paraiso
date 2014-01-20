var services = angular.module( 'services.permissions', [] );

services.factory( 'Permission', permissions );

permissions.$inject = ['$http'];
function permissions ( http ) {
  var permission = new Service();

  permission.addPostPetition( 'getAllPermissionsStatus', '/all/permissions/none/data',
    http, returnData, onError );

  permission.addPostPetition( 'getOnePermission', 
    '/single/permissions/username/data', http, returnData, onError );

  permission.addPostPetition( 'updatePermission', 
    '/permissions/permissions/username/update', http, returnData, onError );

  return permission;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}