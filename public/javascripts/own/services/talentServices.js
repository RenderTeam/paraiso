var services = angular.module( 'services.talent', [] );

services.factory( 'Talent', talent );

talent.$inject = ['$http'];
function talent ( http ) {
  var talents = {};

  talents.getAllTalent = function () {
    var promise = http.post('/getEmployees').
      success( returnData ).
      error( onError );
    return promise;
  };
  
  /*talents.getTasksFromUser = function ( params ) {
    var promise = http.post('/getTasksFromUser', params).
      success( returnData ).
      error( onError );
    return promise;
  };*/

  talents.saveTalent = function ( params ) {
    var promise = http.post('/saveEmployee', params).
      success( returnData ).
      error( onError );
    return promise;
  };

  return talents;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}