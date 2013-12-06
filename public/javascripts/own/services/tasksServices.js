var services = angular.module( 'services.tasks', [] );

services.factory( 'Tasks', tasks );

tasks.$inject = ['$http'];
function tasks ( http ) {
  var tasks = {}; /*Does it crash if tasks is not defined here, because 
  according to linting, it's already defined */ 

  task.getAllTasks = function () {
    var promise = http.post('/getTasks').then( function ( response ) {
      return response.data;
    });
    return promise;
  };
  
  tasks.getTasksFromUser = function ( params ) {
    var promise = http.post('/getTasksFromUser', params).then(
      function ( response ) {
        return response.data;
    });
    return promise;
  };

  tasks.getOneTask = function ( params ) {
    var promise = http.post('/getOneTask', params).then(
      function ( response ) {
        return response.data;
    });
    return promise;
  };

  tasks.saveTask = function ( params ) {
    var promise = http.post('/saveTask', params).then(
      function ( response ) {
        return response.data;
    });
    return promise;
  };

  return task;
}
