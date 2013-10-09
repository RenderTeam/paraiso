var taskAppModule  = angular.module('taskApp', 
  ['taskApp.services']);

taskAppModule.controller('MyTasksController', myTasksController);
taskAppModule.controller('NewTaskController', newTaskController);
taskAppModule.controller('TasksController', tasksController);

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

function newTaskController( $scope ){

  var task = {
    creation_date:  new Date(),
    creator:        'dan', /* Se tiene que recuperar de la sesión */
    title:          '',
    description:    '',
    assigned:       [],
    death_line:     new Date(),
    reminder:       [],
    label:          '',
    priority:       0,
    status:         ''
  };

  $scope.task = task;

  $scope.addReminderToReminders = function(){

    var temporal = {
      numberOfDays: $scope.temporal.reminder
    }

    $scope.task.reminder.push( temporal );
  };

  $scope.addWorkertoAssigned = function(){

    var temporal = {
      name: $scope.temporal.worker
    }

    $scope.task.assigned.push( temporal );
  };

  $scope.removeReminderFromReminders = function( $index ){
    $scope.task.reminder.splice( $index, 1 );
  };

  $scope.removeWorkerFromAssigned = function( $index ){
    $scope.task.assigned.splice( $index, 1 );
  };

  $scope.selectDate = function(){
  };

  $scope.selectLabel = function(){};
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