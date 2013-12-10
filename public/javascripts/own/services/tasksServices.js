var services = angular.module( 'services.tasks', [] );

services.factory( 'Tasks', tasks );

tasks.$inject = ['$http'];
function tasks ( http ) {
  var task = {};

  task.getAllTasks = function () {
    var promise = http.post('/getTasks').
      success( returnData ).
      error( onError );
    return promise;
  };
  
  task.getTasksFromUser = function ( params ) {
    var promise = http.post('/getTasksFromUser', params).
      success( returnData ).
      error( onError );
    return promise;
  };

  task.getOneTask = function ( params ) {
    var promise = http.post('/getOneTask', params).
      success( returnData ).
      error( onError );
    return promise;
  };

  task.saveTask = function ( params ) {
    var promise = http.post('/saveTask', params).
      success( returnData ).
      error( onError );
    return promise;
  };

  return task;
}

function returnData ( response ) {
  return response.data;
}

function onError ( data, status ) {
  console.log( status );
}