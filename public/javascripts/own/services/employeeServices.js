var services = angular.module( 'services.employee', ['Validations'] );

services.factory( 'Employee', employee );

employee.$inject = ['$http'];
function employee ( http ) {
  var employees = new Service();

  employees.addPostPetition( 'getEmployees', '/all/employees/none/data', http, 
    returnData, onError );

  employees.addPostPetition( 'getOneEmployee', '/all/employees/username/data',
    http, returnData, onError );

  employees.addPostPetition( 'updateEmployee', '/employees/employee/username/update', 
    http, returnData, onError );

  employees.addPostPetition( 'saveTalent', '/employees/employee/new', http, 
    returnData, onError );

  return employees;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}