var formsAppModule  = angular.module('formsApp', []);

formsAppModule.controller('NewFormController', formController);

formController.$inject = ['$scope', '$http'];
function formController( scope, http ){
  var html = tag.toHTML();
  http.post('/createForm', {HTML: html} )
      .success( function ( data, status, headers, config ){
        if ( data.status ){
          alert('Cool');
        } else{
          alert('Hubo un error sorry');
        }
      }).error( function ( data, status, headers, config ){
        console.log( 'Error :O' );
      });
}
