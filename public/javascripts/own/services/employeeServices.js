var services = angular.module( 'services.employee', [] );

services.factory( 'Employee', employee );

employee.$inject = ['$http'];
function employee ( http ) {
  var employees = {};

  employees.getAllTalent = function () {
    var promise = http.post('/getEmployees').
      success( returnData ).
      error( onError );
    return promise;
  };

  employees.saveTalent = function ( params ) {
    var promise = http.post('/saveEmployee', params).
      success( returnData ).
      error( onError );
    return promise;
  };

  return employees;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}