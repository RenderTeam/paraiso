function newTaskController ( scope, tasks, users, mail ) {
  tasks.getAllUsers().success( function ( data ) {
    data.forEach(function(element , index, array){
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
    status:      'Por hacer',
    comments:     []
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


  scope.Mail = function(){
    console.log("HOLA");
    var assigned = [];
    scope.task.assigned.forEach(function(element , index, array){
      scope.employees.forEach(function(e,i,a){
        if(e.username == element){
          assigned.push(e);
          //Users asignados a la tarea
        }
      });
    });
    var params        = {},
        temporalMails = '',
        StringforMail = '',
        dataToSubmit  = '',
        date = new Date();
    var mensaje = [];
    dataToSubmit = '<h1>Tarea - '+scope.task.title
    +'</h1><blockquote><h3>Descripción:</h3><p><blockquote>'+
        scope.task.description
    +'</blockquote></p><h3>Asignada por:</h3><p><blockquote>'+
        scope.task.creator
    +'</blockquote></p><h3>Fecha de entrega:</h3><p><blockquote>'+
        scope.task.deadline;
    console.log(scope.isindependient);
    console.log(scope.task.subTasks.lenght);
    console.log(scope.task.lenght);

    if(scope.isindependient && !scope.task.subTasks.lenght > 0){//Las tareas son independientes para cada usuario
      //Se enviara correo por separado
      console.log("Independiente por cada correo");
      assigned.forEach(function(e,i,a){ // Inserción de los remitentes.
        dataToSubmit += '</blockquote></p><h3>Asignada a:</h3><p><blockquote>'+
          e.username;
        dataToSubmit += '</blockquote></p><p style="float:left;color:gray">'+
            date+'<p></blockquote>';
        mensaje.push({
          from:    "Pruebas <hola@renderteam.com.mx>", 
          to:      e.username +' <'+e.mail +'>',
          subject: 'Tarea - '+scope.task.title,
          attachment: 
          [
            {data: dataToSubmit, alternative:true}
          ]
        });
      });
    }
    if(scope.task.subTasks.lenght == 0 && !scope.isindependient){
      console.log("Todos los correos");
      dataToSubmit += '</blockquote></p><h3>Asignada a:</h3><p><blockquote>'+
          scope.task.Assigned;
      dataToSubmit += '</blockquote></p><p style="float:left;color:gray">'+
            date+'<p></blockquote>';
      assigned.forEach(function(e,i,a){ // Inserción de los remitentes.
        temporalMails += e.username +' <'+e.mail +'>,';
      });
      StringforMail = temporalMails.substring(0, temporalMails.length-1);
      console.log(StringforMail);
      /*
        Enrique <enrique@das.cao>
      */
      var message = {
        from:    "Pruebas <hola@renderteam.com.mx>", 
        to:      StringforMail,
        subject: 'Tarea - '+scope.task.title,
        attachment: 
        [
          {data: dataToSubmit, alternative:true}
        ]
      };
      mensaje.push(message);
      //La tarea tiene una subtarea y tendrá un correo diferente al casual.
    }
    if(scope.task.subTasks.lenght > 0 ){
      //La tarea es una simple tarea
      console.log("Con sub tareas");
      dataToSubmit += '</blockquote></p><h3>Asignada a:</h3><p><blockquote>'+
          scope.task.Assigned;
      dataToSubmit += '</blockquote></p><h3> Con las siguientes sub-tareas:</h3><p><blockquote>';
      scope.task.subtasks.forEach(function(e,i,a){
        dataToSubmit += '<blockquote></p>SubTask - <h4>'+e.title+'</h4><p></blockquote>'+
        '<blockquote></p>Asignados - <h4>'+e.assigned+'</h4><p></blockquote>';
      });
      dataToSubmit += '</blockquote></p><p style="float:left;color:gray">'+
            date+'<p></blockquote>';
      assigned.forEach(function(e,i,a){ // Inserción de los remitentes.
        temporalMails += e.username +' <'+e.mail +'>,';
      });
      StringforMail = temporalMails.substring(0, temporalMails.length-1);
      console.log(StringforMail);
      /*
        Enrique <enrique@das.cao>
      */
      var message = {
        from:    "Pruebas <hola@renderteam.com.mx>", 
        to:      StringforMail,
        subject: 'Tarea - '+scope.task.title,
        attachment: 
        [
          {data: dataToSubmit, alternative:true}
        ]
      };
      mensaje.push(message);
    }
    mensaje.forEach(function(e,i,a){
      console.log('MENSAJE',e);
      /*params.message = e;
      mail.sendMail( params ).
        success(
          function ( data ) {
            if( data.status ){
              newNotification('',
                              'Se envío un correo exitosamente.',
                              'success');
            }else{
              newNotification('',
                              'No se pudo enviar el correo.',
                              'danger');
            }
          }
        ).
        error(
          function( data ) {
            console.log( data );
          }
        );*/
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
      id: id,
      status:''
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
      if(scope.isindependient){
        var deadline = new Date(scope.task.deadline);
        scope.task.assigned.forEach(function(element , index, array){
           console.log("a[" + index + "] = " + element);
           scope.newSimpleTask(element, deadline);
           scope.Mail();
        });
      }else{
        if(scope.withsubtask){
          $('#subTasks').modal('show');
        }else{
          scope.newTask();
          scope.Mail();
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
    scope.Mail();
    scope.task = reset();
  }
  scope.newSimpleTask = function ( user, deadline ){
    var params = {};
    scope.task.creation_date = new Date();
    scope.task.deadline = new Date( scope.task.deadline );
    deadline.setDate( deadline + 1);
    params.task = scope.task;
    scope.task.assigned = [user];
    tasks.saveTask( params ).then( function ( data ) {
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
      newNotification('','Tarea Asignada con éxito.','success');
    });
  }
};

function reset(){
  users = [];
  temporal = {
    worker: ""
  };
  isindependient = false;
  temporalForm = {
    reminder: [],
    assigned: []
  };
  subTasks = [];
  temporalForm = {
    reminder: [],
    assigned: []
  };
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
          status:      'Por hacer',
          comments:     [{
            subtask:   '',
            user:      '',
            comment:   '',
            date:      ''
          }]
        };
}