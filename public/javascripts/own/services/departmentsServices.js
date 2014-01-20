var services = angular.module( 'services.departments', [] );

services.factory( 'Departments', department );

department.$inject = ['$http'];
function department ( http ) {
  var departments = new Service();

  departments.addPostPetition( 'getDepartments', '/all/departments/none/data', http, 
    returnData, onError );

  departments.addPostPetition( 'saveDepartment', '/departments/department/new', 
    http, returnData, onError );

  return departments;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}