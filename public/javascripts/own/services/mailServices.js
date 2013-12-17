var services = angular.module( 'services.mail', [] );

services.factory( 'Mail', mail );

mail.$inject = ['$http'];
function mail ( http ) {
  var mail = {};
  mail.sendMail = function ( params ) {
    var promise = http.post( '/sendMail', params ).
      success( function ( response ) {
        console.log("Hola");
        return response.data;
      });
    return promise;
  };
  return mail;
}
