var services = angular.module( 'services.tasks', [] );

services.factory( 'Tasks', tasks );

tasks.$inject = ['$http'];
function tasks ( http ) {
  var task = new Service();

  task.addPostPetition( 'getAllTasks', '/all/tasks/none/data', http, returnData, 
    onError );

  /*
   * The third parameter is an exception check mongo-queries.js/getAll to see
   * the correct implementation
   */
  task.addPostPetition( 'getTasksFromUser', '/all/tasks/tasks/data', http, 
    returnData, onError );

  task.addPostPetition( 'getOneTask', '/single/tasks/creation_date/data', http, 
    returnData, onError );

  task.addPostPetition( 'saveTask', '/saveTask', http, returnData, onError );

  return task;
}

function returnData ( response ) {
  console.log( "LLLLLLLLOOOOOOOOOOOOOOOLLLLLLLLLL");
  return response.data;
}

function onError ( data, status ) {

  console.log( status );
}