var services = angular.module( 'taskApp.services', [] );

services.factory('Tasks', function ( $http ){
  var tasks = {};

  tasks.getAllTasks = function() {
    var promise = $http.post('/getTasks').then( function ( response ) {
      return response.data;
    });
    return promise
  };

  tasks.getTasksFromUser = function( params ) {
    var promise = $http.post('/getTasksFromUser', params).then( function ( response ) {
      return response.data;
    });
    return promise;
  };

  tasks.getOneTask = function( params ) {
    var promise = $http.post('/getOneTask', params).then( function ( response ) {
      return response.data;
    });
    return promise;
  };

  return tasks;
});