var services = angular.module( 'services.users', [] );

services.factory( 'Users', users );

users.$inject = ['$http'];
function users ( http ) {
  var user = {};

  user.saveUser = function () {
    var promise = http.post('/saveUser', params).
      success( returnData ).
      error( onError );
    return promise;
  }

  user.getOneUser = function ( params ) {
    var promise = http.post('/getOneUser', params).
      success( returnData ).
      error( onError );
    return promise;
  };

  user.getAllUsersNames = function () {
    var promise = http.post('/getUsersNames').then(
      function ( response ) {
        return response.data;
      }
    );
    return promise;
  };

  return user;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}