var services = angular.module( 'services.tasks', [] );

services.factory( 'Tasks', tasks );

tasks.$inject = ['$http'];
function tasks ( http ) {
  var task = new Service();

  task.addPostPetition( 'getAllTasks', '/getTasks', http, returnData, onError );

  task.addPostPetition( 'getTasksFromUser', '/getTasksFromUser', http, 
    returnData, onError );

  task.addPostPetition( 'getOneTask', '/getOneTask', http, returnData, onError );

  task.addPostPetition( 'saveTask', '/saveTask', http, returnData, onError );

  return task;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}