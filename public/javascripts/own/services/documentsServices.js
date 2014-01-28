var services = angular.module( 'services.documents', [] );

services.factory( 'Documents', documents );

documents.$inject = ['$http'];
function documents ( http ) {
  documents.Example = function ( params ) {

    var promise = http({method: 'POST', url: '/Example', 
      data: params,
      headers: {'Content-Type': undefined},
      transformRequest: angular.identity}).
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
  return documents;
}