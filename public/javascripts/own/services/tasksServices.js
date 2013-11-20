var services = angular.module( 'services.tasks', [] );

services.factory( 'Tasks', tasks );

tasks.$inject = ['$http'];
function tasks ( http ) {
  var task = {};

  task.getAllTasks = function () {
    var promise = http.post('/getTasks').then( function ( response ) {
      return response.data;
    });
    return promise;
  };
  
  task.getTasksFromUser = function ( params ) {
    var promise = http.post('/getTasksFromUser', params).then(
      function ( response ) {
        return response.data;
    });
    return promise;
  };

  task.getOneTask = function ( params ) {
    var promise = http.post('/getOneTask', params).then(
      function ( response ) {
        return response.data;
    });
    return promise;
  };

  task.saveTask = function ( params ) {
    var promise = http.post('/saveTask', params).then(
      function ( response ) {
        return response.data;
    });
    return promise;
  };

  return task;
}
