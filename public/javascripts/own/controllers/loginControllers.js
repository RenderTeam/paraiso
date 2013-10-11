var loginAppModule  = angular.module('loginApp', []);

loginAppModule.controller('LoginController', loginController);

loginController.$inject = ['$scope', '$http'];
function loginController( scope, http ){

  scope.login = function() {
    http.post('/login', scope.user)
    .success( function ( data, status, headers, config ){
      if( data.flag ){
        // Redirect to /tasks/tasks
        window.location.href = ('/tasks/tasks');
      }else{
        scope.user = {
          user: '',
          password: ''
        };
        alert('Nop');
      }
    }).error( function ( data, status, headers, config ){
      console.log( 'Error :O' );
    });
  };
}
