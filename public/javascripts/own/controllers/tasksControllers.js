var taskAppModule  = angular.module('taskApp', []);

taskAppModule.controller('TasksController', tasksController);
taskAppModule.controller('MyTasksController', myTasksController);
taskAppModule.factory('Tasks', tasksFactory);

function tasksFactory( $http ){
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
}

function tasksController( $scope, Tasks ){

  Tasks.getAllTasks().then( function( data ) {
    $scope.tasks =  data;
  });

  //Call to one task when an user clicks the expand button
  $scope.callOfDuty = function(){
    var params = {};

    params = this.task;

    Tasks.getOneTask( params ).then( function( data ) {
      var today = new Date(),
          deadline = new Date(data.deadline);

      data.daysToDeadline = deadline.getDate() - today.getDate();

      $scope.duty = data;
    });
  };
}

function myTasksController( $scope, Tasks ){
  var params = {};

  params.assigned = ['dan'];

  Tasks.getTasksFromUser( params ).then( function( data ) {
    $scope.tasks =  data;
  });

  //Call to one task when an user click the expand button
  $scope.callOfDuty = function(){
    var params = {};

    params = this.task;

    Tasks.getOneTask( params ).then( function( data ) {
      var today = new Date(),
          deadline = new Date(data.deadline);

      data.daysToDeadline = deadline.getDate() - today.getDate();

      $scope.duty = data;
    });
  };
}

