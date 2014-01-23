var generalAppModule  = angular.module( 'generalApp', [] );

generalAppModule.controller( 'generalController', generalController );

generalController.$inject = [ '$scope', '$http' ];
function generalController( scope , http ){
  console.log( 'Cierre de sesión exitoso' );
  scope.general.taskNumber = 10;
  scope.viewTaskNumber = function () {
    
  };

  scope.logout = function(){
    console.log( 'Cierre de sesión exitoso' );
    http.post('/logout')
    .success( function ( data, status, headers, config ) {
        console.log( 'Cierre de sesión exitoso' );
      }
    ).error( function ( data, status, headers, config ) {
      console.log( 'Error :O' );
    });
  };
}