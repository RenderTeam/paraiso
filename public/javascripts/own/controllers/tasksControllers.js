var taskAppModule  = angular.module( 'taskApp',
  [ 'services.tasks', 'services.users' ] );

taskAppModule.controller( 'MyTasksController', myTasksController );
taskAppModule.controller( 'NewTaskController', newTaskController );
taskAppModule.controller( 'TasksController', tasksController );

myTasksController.$inject = [ '$scope', 'Tasks' ];
function myTasksController ( scope, tasks ) {
  tasks.getTasksFromUser().success( function ( data ) {
    scope.tasks =  data;
  });

  //Call to one task when an user click the expand button
  scope.callOfDuty = function () {
    var params = {};

    params = this.task;

    tasks.getOneTask( params ).
      success( function ( data ) {
        var today = new Date(),
            deadline = new Date( data.deadline );

        data.daysToDeadline = deadline.getDate() - today.getDate();

        scope.duty = data;
      }).
      error();
  };
}

newTaskController.$inject = [ '$scope', 'Tasks', 'Users' ];
function newTaskController ( scope, tasks, users ) {

  scope.task = {
    creation_date:  new Date(),
    creator:        '', /* Se tiene que recuperar de la sesión */
    title:          '',
    description:    '',
    assigned:       [],
    deadline:       new Date(),
    reminder:       [],
    label:          '',
    priority:       0,
    status:         'not done'
  };

  scope.temporal = {
    worker: ""
  };

  scope.temporalForm = {
    reminder: [],
    assigned: []
  };

  scope.labels = [{ label: 'P'},
                  { label: 'NC'},
                  { label: 'AC'},
                  { label: 'AP'},
                  { label: 'LOL'}];

  scope.addReminderToReminders = function () {
    if ( scope.temporal.reminder > 0 && scope.temporal.reminder < 60 ) {
      if( !scope.task.reminder.contains( scope.temporal.reminder ) ){
        var temporal = {
          numberOfDays: scope.temporal.reminder
        };
        
        scope.task.reminder.push( scope.temporal.reminder );
        scope.temporalForm.reminder.push( temporal );
      }
    }
    scope.temporal.reminder = "";
  };

  scope.addWorkertoAssigned = function () {
    if( scope.temporal.worker !== '' ){
      if ( !scope.task.assigned.contains( scope.temporal.worker ) ) {
        var temporal = {
          username: scope.temporal.worker
        };

        scope.temporalForm.assigned.push( temporal );
        scope.task.assigned.push( scope.temporal.worker );
      }
    }
    scope.temporal.worker = "";
  };

  scope.removeReminderFromReminders = function( index ){
    scope.task.reminder.splice( index, 1 );
    scope.temporalForm.reminder.splice( index, 1 );
  };

  scope.removeWorkerFromAssigned = function( index ){
    scope.task.assigned.splice( index, 1 );
    scope.temporalForm.assigned.splice( index, 1 );
  };

  scope.selectLabel = function ( index ) {
    scope.task.label = scope.labels[index].label;
  };

  scope.newTask = function () {
    scope.task.creation_date = new Date();

    var params = {};

    params.task = scope.task;

    tasks.saveTask( params ).
      success( function ( data ) {
        scope.task = {
          creation_date:  new Date(),
          creator:        '', /* Se tiene que recuperar de la sesión */
          title:          '',
          description:    '',
          assigned:       [],
          deadline:       new Date(),
          reminder:       [],
          label:          '',
          priority:       0,
          status:         'not done'
        };

        scope.temporal = {
          worker: ""
        };

        scope.temporalForm = {
          reminder: [],
          assigned: []
        };
        alert('Excelente :)');
      });
  };

  /*users.getAllUsersNames().success( function (data) {
    console.log( data );
  });*/
}

tasksController.$inject = [ '$scope', 'Tasks' ];
function tasksController ( scope, tasks ) {

  tasks.getAllTasks().success( function ( data ) {
    scope.tasks =  data;
  });

  //Call to one task when an user clicks the expand button
  scope.callOfDuty = function(){
    var params = {};

    params = this.task;

    tasks.getOneTask( params ).success( function ( data ) {
      var today = new Date(),
          deadline = new Date( data.deadline );

      data.daysToDeadline = deadline.getDate() - today.getDate();

      scope.duty = data;
    });
  };
}

Array.prototype.contains = function( obj ) {
  var i = this.length;
  while ( i-- ) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};