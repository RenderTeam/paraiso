var services = angular.module( 'services.permissions', [] );

services.factory( 'Permission', permissions );

permissions.$inject = ['$http'];
function permissions ( http ) {
  var permission = {};

  permission.getAllPermissionsStatus = function () {
    var promise = http.post('/getAllPermissionsStatus').
      success( returnData ).
      error( onError );
    return promise;
  };

  permission.getOnePermission = function ( params ) {
    var promise = http.post( '/getOnePermission', params ).
      success( returnData ).
      error( onError );
    return promise;
  }

  permission.updatePermission = function ( params ) {
    var promise = http.post( '/updatePermission', params ).
      success( returnData ).
      error( onError );
    return promise;
  }

  return permission;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}