var services = angular.module( 'services.users', [] );

services.factory( 'Users', users );

users.$inject = ['$http'];
function users ( http ) {
  var user = new Service();

  user.addPostPetition( 'saveUser', '/saveUser', http, returnData, onError );

  user.addPostPetition( 'getOneUser', '/getOneUser', http, returnData, onError );

  user.addPostPetition( 'getAllUsersNames', '/getUsersNames', http, returnData, 
    onError );

  return user;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}