var services = angular.module( 'services.documents', [] );

services.factory( 'Documents', documents );

documents.$inject = ['$http'];
function documents ( http ) {
  var doc = new Service();

  doc.addPostPetition('showFiles', '/all/files/data', http, 
    returnData, onError );

  doc.sendFile = function ( params ) {
    var promise = http( {
      method: 'POST',
      url: '/files/new',
      data: params,
      headers: { 'Content-Type': undefined },
      transformRequest: angular.identity
    }).success( returnData )
      .error( onError );
    return promise;
  };
  return doc;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}