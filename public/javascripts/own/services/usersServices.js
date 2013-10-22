var services = angular.module( 'services.users', [] );

services.factory( 'Users', users );

users.$inject = ['$http'];
function users ( http ) {
  var user = {};

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