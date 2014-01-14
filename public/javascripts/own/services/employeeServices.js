var services = angular.module( 'services.employee', [] );

services.factory( 'Employee', employee );

employee.$inject = ['$http'];
function employee ( http ) {
  var employees = new Service();

  employees.addPostPetition( 'getEmployees', '/getEmployees', http, returnData,
    onError );

  employees.addPostPetition( 'getOneEmployee', '/getOneEmployee', http,
    returnData, onError );

  employees.addPostPetition( 'updateEmployee', '/updateEmployee', http,
    returnData, onError );

  employees.addPostPetition( 'saveTalent', '/saveTalent', http, returnData,
    onError );

  return employees;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}