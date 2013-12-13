var taskAppModule  = angular.module( 'taskApp',
  [ 'services.tasks', 'services.users' ] );

taskAppModule.controller( 'MyTasksController', myTasksController );
taskAppModule.controller( 'NewTaskController', newTaskController );
taskAppModule.controller( 'TasksController', tasksController );

myTasksController.$inject = [ '$scope', 'Tasks' ];
function myTasksController ( scope, tasks ) {
  tasks.getTasksFromUser().then( function ( data ) {
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

  scope.dateValidation = {
    message : '',
    status  : true
  }
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

  scope.validateDate= function (){
    var deadline,
        flag = true,
        today = new Date(),
        deadline = new Date( scope.task.deadline );
    if( deadline.getYear() < today.getYear() ){
      scope.dateValidation.message = 'El año seleccionado es menor';
      scope.dateValidation.status = false;
      flag = false;
    }
    if( deadline.getDate() < today.getDate() ){
      scope.dateValidation.message = 'El dia seleccionado es menor';
      scope.dateValidation.status = false;
      flag = false;

    }
    if( deadline.getMonth() < today.getMonth() ){
      scope.dateValidation.message = 'El mes seleccionado es menor';
      scope.dateValidation.status = false;
      flag = false;
      console.log(deadline.getMonth());
      console.log(today.getMonth());
    }
    if ( flag ){
      console.log("Fecha correcta");
      //scope.newFormTask = newTaskController();
      scope.dateValidation.message = null;
      scope.dateValidation.status = true;
    }
  };

  scope.newTask = function () {
    scope.task.creation_date = new Date();
    var params = {};

    params.task = scope.task;

    tasks.saveTask( params ).then( function ( data ) {
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

  /*users.getAllUsersNames().then( function (data) {
    console.log( data );
  });*/
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

Array.prototype.contains = function( obj ) {
  var i = this.length;
  while ( i-- ) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};
