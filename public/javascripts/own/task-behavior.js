function start () {
  
  tooltipConstructor( '#remainderSpan', 
    'Número de días antes de la fecha límite en los cuales el sistema ' +
    'recordará al usuario la tarea.' );
  
  tooltipConstructor( '#creationDayspan', 
    'Día de creación de la tarea.' );

  $('#seeUsers').popover({
    html: true,
    content: function () {

      return $("#workers-content").show();
      //return $("#seeUsers").text();
    }
  });
  $('#seeUsers').on('hidden.bs.popover',function(){
    $("#workers-content").clone();
  });
}
$(document).ready( start );