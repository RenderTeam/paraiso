var loginAppModule  = angular.module( 'loginApp', [] );

loginAppModule.controller( 'LoginController', loginController );

loginController.$inject = [ '$scope', '$http' ];
function loginController( scope, http ){

  scope.login = function () {
    http.post( '/login', scope.user )
    .success( function ( data, status, headers, config ) {
      if ( data.flag ) {
        console.log("DVJOFDZCJXVZ OZDJFVOKREODSKVOKRD");
        window.location.href = ('/tasks/tasks');
      }else{
        console.log("no redirigiremos");
        scope.user = {
          user: '',
          password: ''
        };
        //Mensaje y/o manejo de mal inicio de sesion
        alert('Usuario y/o contraseña inválidos. Intenta nuevamente');
      }
    }).error( function ( data, status, headers, config ) {
      console.log( 'Error :O' );
    });
  };
}
