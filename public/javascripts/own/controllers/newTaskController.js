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
    status  : false
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

  scope.newTask = function () {
    console.log(scope.task.deadline);
    scope.task.creation_date = new Date();
    scope.task.deadline = new Date( scope.task.deadline );
    console.log(scope.task.deadline);
    scope.task.deadline.setDate(scope.task.deadline.getDate() + 1);
    console.log(scope.task.deadline);
    var params = {};
    params.task = scope.task;
    var flag = false;
    if( scope.task.assigned.length > 0 ) {
      flag = true;
      if( scope.task.reminder.length > 0 ) {
        flag = true;
      }
    }
    if( flag === true ) {
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
    } else {
      alert('Verifique que tenga usuarios y recordatorios agregados');
    }
  }
  /*users.getAllUsersNames().then( function (data) {
    console.log( data );
  });*/
};

Array.prototype.contains = function( obj ) {
  var i = this.length;
  while ( i-- ) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};