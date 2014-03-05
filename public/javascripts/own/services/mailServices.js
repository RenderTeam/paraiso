var services = angular.module( 'services.mail', [] );

services.factory( 'Mail', mail );

mail.$inject = ['$http'];
function mail ( http ) {
  var mail = {};
  mail.sendMail = function ( params ) {
    var promise = http.post( '/mailing', params ).
      success( 
        function ( response ) {
          return response.data;
        }
      ).
      error(
        function ( data, status ) {
          console.log( status );
        }
      );;
    return promise;
  };
  return mail;
}
