function start () {
  
  tooltipConstructor( '#remainderSpan', 
    'Número de días antes de la fecha límite en los cuales el sistema ' +
    'recordará al usuario la tarea.','bottom' );
  
  tooltipConstructor( '#creationDayspan', 
    'Día de creación de la tarea.','bottom' );

  tooltipConstructor( '#descriptionlabel', 
    'Tipo de tarea.', 'top' );

  $('#createTask').on('click',function(){
    try {
      var flag = 0;
      if( angular.element('#workersRepeat').scope().task.assigned.length > 0 ) {
        flag ++;
      }
    } catch (e) {
      alert('Al menos agregue algun usuario');
    }
    try {
      if(angular.element('#reminderRepeat').scope().task.reminder.length > 0 ) {
        flag ++;
      }
    } catch (e) {
      // Revisar las alertas y los mensajes al usuario :)
      alert('Al menos agregue algun recordatorio');
    }
    if( flag > 1)
      var toCreateTask = angular.element('#newTaskForm').scope();
      toCreateTask.newTask();
  });

  $('.collapseToogle').on( 'click', function() {
    if( $(this).hasClass('glyphicon-chevron-up') ){
      $(this).removeClass('glyphicon-chevron-up');
      $(this).addClass('glyphicon-chevron-down');
    } else {
      $(this).removeClass('glyphicon-chevron-down');
      $(this).addClass('glyphicon-chevron-up');
    }
  });
}
$(document).ready( start );