var services = angular.module( 'services.users', [] );

services.factory( 'Users', users );

users.$inject = ['$http'];
function users ( http ) {
  var users = {};

  users.getAllUsersNames = function () {
    var promise = http.post('/getUsersNames').then(
      function ( response ) {
        return response.data;
      }
    );
    return promise;
  }

  return users;
}