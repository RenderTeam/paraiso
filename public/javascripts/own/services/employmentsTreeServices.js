var services = angular.module( 'services.tree', [] );

services.factory( 'EmploymentTree', employmentTree );

employmentTree.$inject = ['$http'];
function employmentTree ( http ) {
  var employmentsTrees = new Service();

  employmentsTrees.addPostPetition( 'getEmploymentsTree', 
    // '/getEmploymentsTree', http, returnData, onError );
    '/single/employmentsTrees/data', http, returnData, onError );

  employmentsTrees.addPostPetition( 'getSmallEmploymentsTree', 
    '/getSmallEmploymentsTree', http, returnData, onError );

  return employmentsTrees;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}