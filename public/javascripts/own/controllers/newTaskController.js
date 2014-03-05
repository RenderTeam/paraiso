function newTaskController ( scope, tasks, users, mail ) {
  console.log('TAREAS',tasks);
  console.log('MAIL',mail);
  console.log('USERS',users);
  console.log('SCOPE',scope);
  tasks.getAllUsers().success( function ( data ) {
    data.forEach(function(element , index, array){
         console.log("a[" + index + "] = " + array[index].username);
         scope.users.push( array[index].username );
      });
  });
  tasks.getEmployees().success( function ( data ) {
    scope.employees = data;
  });
  scope.employees = [];
  scope.task = {
    creation_date:  new Date(),
    creator:        user, /* Se tiene que recuperar de la sesión */
    deadline:       new Date(),
    description:    '',
    assigned:       [],
    label:          '',
    priority:       0,
    reminder:       [],
    dateReviewed:   new Date(),
    title:          '',
    percentageDone: '0',
    subTasks:       {},
    status:      'to Do',
    comments:     [{
      user:      '',
      comment:   '',
      date:      ''
    }]
  };
  scope.users = [];
  scope.mails = [];
  scope.temporal = {
    worker: ""
  };
  scope.isindependient = false;
  scope.temporalForm = {
    reminder: [],
    assigned: []
  };
  scope.temporalSubtask = [];
  scope.temporalUsersInSubtask = [];

  scope.subTasks = [];
  scope.labels = [{ label: 'P'},
                  { label: 'NC'},
                  { label: 'AC'},
                  { label: 'AP'},
                  { label: 'LOL'}];


  scope.Mail = function( assigned ){
    console.log( assigned );
    var params        = {},
        temporalMails = '',
        StringforMail = '',
        dataToSubmit  = '',
        date = new Date();
    assigned.forEach(function(e,i,a){
      temporalMails += e.username +' <'+e.mail +'>,';
    });
    StringforMail = temporalMails.substring(0, temporalMails.length-1);
    console.log(StringforMail);
    dataToSubmit = '<h1>Tarea - '+scope.task.title
    +'</h1><blockquote><h3>Descripción:</h3><p><blockquote>'+
        scope.task.description
    +'</blockquote></p><h3>Asignada por:</h3><p><blockquote>'+
        scope.task.creator
    +'</blockquote></p><h3>Fecha de entrega:</h3><p><blockquote>'+
        scope.task.deadline
    +'</blockquote></p><h3>Asignada a:</h3><p><blockquote>'+
        scope.task.assigned
    +'</blockquote></p><p style="float:left;color:gray">'+
    date+'<p></blockquote>';
    var message = {
      from:    "Pruebas <hola@renderteam.com.mx>", 
      to:      StringforMail,
      subject: 'Tarea - '+scope.task.title,
      attachment: 
      [
        {data: dataToSubmit, alternative:true}
      ]
    };
    params.message = message;
    mail.sendMail( params ).
      success(
        function ( data ) {
          if( data.status ){
            newNotification('',
                            'Correos enviados exitosamente.',
                            'success');
          }else{
            newNotification('',
                            'Los correos no se enviaron.',
                            'danger');
          }
        }
      ).
      error(
        function( data ) {
          console.log( data );
        }
      );
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
  scope.AddSubTask = function (){
    var id='Render';
    do {                
          var ascicode=Math.floor((Math.random()*42)+48);
          if (ascicode<58 || ascicode>64){
              id+=String.fromCharCode(ascicode);    
          }                
      } while (id.length<17);
    scope.subTasks.push({
      title: '',
      priority: '',
      assigned:[],
      id: id
    });
  }

  scope.addAssigned = function (subtask){
    scope.subTasks.forEach(function(a,e,b){
      if(a.id == subtask.id){
        if(a.assigned.length > 0){
          if(!a.assigned.contains(subtask.userassigned)){
            a.assigned.push(subtask.userassigned);
          }
          else{
            newNotification('','El usuario ya existe.','danger');
          }
        }
        else{
          a.assigned.push(subtask.userassigned);
        }
      }
    });
  }
  scope.removeAssigned=function(index){
    scope.subTasks.forEach(function(a,e,b){
      a.assigned.splice( index, 1 );
    });
    console.log(index);
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
    var flag = false;
    if( scope.task.assigned.length > 0 ) {
      flag = true;
      if( scope.task.reminder.length > 0 ) {
        flag = true;
      }else{
        flag = false;
      }
    }
    if( flag === true ) {
      var assigned = [];
      scope.task.assigned.forEach(function(element , index, array){
        console.log("a[" + index + "] = " + element);
        scope.employees.forEach(function(e,i,a){
          if(e.username == element){
            assigned.push(e);
          }
        });
      });
      scope.Mail( assigned );
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
          scope.newTask();
        }
      }
    }else{
      newNotification('','Verifique que tenga usuarios y recordatorios agregados.',
        'danger');
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
    
    scope.task.assigned = [user];
    
      tasks.saveTask( params ).then( function ( data ) {
        scope.task = reset();
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
        newNotification('','Tarea Asignada con éxito.','success');
      });
  }
  scope.newTask = function () {
    scope.task.creation_date = new Date();
    scope.task.deadline = new Date( scope.task.deadline );
    scope.task.deadline.setDate(scope.task.deadline.getDate() + 1);
    var params = {};
    params.task = scope.task;
    tasks.saveTask( params ).then( function ( data ) {
      scope.task = reset();

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
      newNotification('','Tarea Asignada con éxito.','success');
    });
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

function reset(){
  return {
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
}