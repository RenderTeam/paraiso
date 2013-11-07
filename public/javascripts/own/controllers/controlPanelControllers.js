var controlPanelAppModule  = angular.module('controlPanelApp', []);

controlPanelAppModule.controller('NewUserController', newUserController);

newUserController.$inject = ['$scope', '$http'];
function newUserController( scope, http ){

  scope.newUser = function(){
    http.post('/saveUser', scope.user)
      .success( function ( data, status, headers, config ){
        if ( data.status ){
          scope.user = {
            user: '',
            password: ''
          };
        } else{
          alert('Hubo un error sorry');
        }
      }).error( function ( data, status, headers, config ){
        console.log( 'Error :O' );
      });
  };
}