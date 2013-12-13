function start () {
  
  tooltipConstructor( '#remainderSpan', 
    'Número de días antes de la fecha límite en los cuales el sistema ' +
    'recordará al usuario la tarea.','bottom' );
  
  tooltipConstructor( '#creationDayspan', 
    'Día de creación de la tarea.','bottom' );

  tooltipConstructor( '#descriptionlabel', 
    'Tipo de tarea.', 'top' );

  $('#createTask').on('click',function(){
    var flag = false,
    toCreateTask = angular.element('#newTaskForm').scope();
    try {
      if( angular.element('#workersRepeat').scope().task.assigned.length > 0 ) {
        flag = true;
        try {
          if( angular.element('#reminderRepeat').scope().task.reminder.length > 0 ) {
            flag = true;
          } 
        } catch (e) {
          flag = false;
        }
      }
    } catch (e) {
      flag = false;
    }
    if( flag === true ){
      angular.element('#reminderRepeat').scope().newTask();
    }
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