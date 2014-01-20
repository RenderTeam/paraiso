var services = angular.module( 'services.employment', [] );

services.factory( 'Employment', employment );

employment.$inject = ['$http'];
function employment ( http ) {
  var employments = new Service();

  employments.addPostPetition( 'getEmployments', '/all/employments/none/data', http, 
    returnData, onError );

  employments.addPostPetition( 'getEmploymentsByDepartment', 
    '/all/employments/department/data', http, returnData, onError );

  employments.addPostPetition( 'saveEmployment', '/saveEmployment', http, 
    returnData, onError );

  return employments;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}