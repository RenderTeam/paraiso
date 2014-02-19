function newTaskController ( scope, tasks ) {
  tasks.getAllUsers().success( function ( data ) {
    data.forEach(function(element , index, array){
         console.log("a[" + index + "] = " + array[index].username);
         scope.users.push( array[index].username );
      });

    console.log(scope.users);
  });
  scope.task = {
    creation_date:  new Date(),
    creator:        '', /* Se tiene que recuperar de la sesión */
    deadline:       new Date(),
    description:    '',
    assigned:       [],
    label:          '',
    priority:       0,
    reminder:       [],
    dateReviewed:   new Date(),
    title:          '',
    percentageDone: '',
    subTasks:       {},
    status:      'to Do',
    comments:     [{
      user:      '',
      comment:   '',
      date:      ''
    }]
  };
  scope.users = [];
  scope.temporal = {
    worker: ""
  };
  scope.isindependient = false;
  scope.temporalForm = {
    reminder: [],
    assigned: []
  };
  scope.subTasks = [];
  scope.labels = [{ label: 'P'},
                  { label: 'NC'},
                  { label: 'AC'},
                  { label: 'AP'},
                  { label: 'LOL'}];
  scope.AddSubTask = function (){
    scope.subTasks.push({
        title: '',
        priority: '',
        assigned:[]
      });
  }
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

  scope.toSubmit = function (){
    console.log(scope.isindependient);
    console.log(scope.withsubtask);
    if(scope.isindependient){
      var deadline = new Date(scope.task.deadline);
      scope.task.assigned.forEach(function(element , index, array){
         console.log("a[" + index + "] = " + element);
         scope.newSimpleTask(element, deadline);
      });
    }else{
      if(scope.withsubtask){
        $('#subTasks').modal('show');
      }else{

      }
      //scope.newTask();
    }
    
  }
  scope.newTaskWithSubTask= function(){
    scope.task.subTasks = scope.subTasks;
    scope.task.percentageDone = '0/'+ scope.subTasks.length;
    scope.newTask();
  }
  scope.newSimpleTask = function ( user, deadline ){
    var params = {};
    scope.task.creation_date = new Date();
    scope.task.deadline = new Date( scope.task.deadline );
    deadline.setDate( deadline + 1);
    params.task = scope.task;
    var flag = false;
    scope.task.assigned = [user];
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
          deadline:       new Date(),
          description:    '',
          assigned:       [],
          label:          '',
          priority:       0,
          reminder:       [],
          dateReviewed:   new Date(),
          title:          '',
          percentageDone: 0,
          subTasks:       {},
          status:      'to Do',
          comments:     [{
            user:      '',
            comment:   '',
            date:      ''
          }]
        };

        scope.users = [];
        scope.temporal = {
          worker: ""
        };
        scope.isindependient = false;
        scope.temporalForm = {
          reminder: [],
          assigned: []
        };
        scope.subTasks = [];

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
  scope.newTask = function () {
    scope.task.creation_date = new Date();
    scope.task.deadline = new Date( scope.task.deadline );
    scope.task.deadline.setDate(scope.task.deadline.getDate() + 1);
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
          deadline:       new Date(),
          description:    '',
          assigned:       [],
          label:          '',
          priority:       0,
          reminder:       [],
          dateReviewed:   new Date(),
          title:          '',
          percentageDone: 0,
          subTasks:       {},
          status:      'to Do',
          comments:     [{
            user:      '',
            comment:   '',
            date:      ''
          }]
        };

        scope.users = [];
        scope.temporal = {
          worker: ""
        };
        scope.isindependient = false;
        scope.temporalForm = {
          reminder: [],
          assigned: []
        };
        scope.subTasks = [];
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