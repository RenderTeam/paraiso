var taskAppModule  = angular.module( 'taskApp',
  [ 'services.tasks', 'services.users' ] );

taskAppModule.controller( 'MyTasksController', myTasksController );
taskAppModule.controller( 'NewTaskController', newTaskController );
taskAppModule.controller( 'TasksController', tasksController );

myTasksController.$inject = [ '$scope', 'Tasks' ];
function myTasksController ( scope, tasks ) {
  var params = {};

  params.assigned = ['dan'];

  tasks.getTasksFromUser( params ).then( function ( data ) {
    scope.tasks =  data;
  });

  //Call to one task when an user click the expand button
  scope.callOfDuty = function () {
    var params = {};

    params = this.task;

    tasks.getOneTask( params ).then( function ( data ) {
      var today = new Date(),
          deadline = new Date( data.deadline );

      data.daysToDeadline = deadline.getDate() - today.getDate();

      scope.duty = data;
    });
  };
}

newTaskController.$inject = [ '$scope', 'Tasks', 'Users' ];
function newTaskController ( scope, tasks, users ) {

  var task = {
    creation_date:  new Date(),
    creator:        'Sesión', /* Se tiene que recuperar de la sesión */
    title:          '',
    description:    '',
    assigned:       [],
    deadline:       new Date(),
    reminder:       [],
    label:          'green',
    priority:       0,
    status:         'not done'
  };

  scope.task = task;

  scope.addReminderToReminders = function () {

    var temporal = {
      numberOfDays: scope.temporal.reminder
    }

    scope.task.reminder.push( temporal );
  };

  scope.addWorkertoAssigned = function () {

    var temporal = {
      username: scope.temporal.worker
    }

    scope.task.assigned.push( temporal );
  };

  scope.removeReminderFromReminders = function( $index ){
    scope.task.reminder.splice( $index, 1 );
  };

  scope.removeWorkerFromAssigned = function( $index ){
    scope.task.assigned.splice( $index, 1 );
  };

  scope.selectLabel = function () {};

  scope.newTask= function () {
    scope.task.creation_date = new Date();


    var params = {};

    params.task = scope.task;
    
    tasks.saveTask( params ).then( function ( data ) {
      console.log( data );
    });
  };

  users.getAllUsersNames().then( function (data) {
    console.log( data );
  });
}

tasksController.$inject = [ '$scope', 'Tasks' ];
function tasksController ( scope, tasks ) {

  tasks.getAllTasks().then( function ( data ) {
    scope.tasks =  data;
  });

  //Call to one task when an user clicks the expand button
  scope.callOfDuty = function(){
    var params = {};

    params = this.task;

    tasks.getOneTask( params ).then( function ( data ) {
      var today = new Date(),
          deadline = new Date( data.deadline );

      data.daysToDeadline = deadline.getDate() - today.getDate();

      scope.duty = data;
    });
  };
}