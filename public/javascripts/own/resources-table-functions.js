function start () {
  $('.launch-modal-preview').on( 'click', modalPreview );
  $('#viewList').on( 'click', viewList );
  $('#viewCalendar').on( 'click', viewCalendar);
}

function viewList (){
    $('#calendar').slideUp();
    $('#list').slideDown();
}

function viewCalendar (){
    $('#list').slideUp();
    $('#calendar').slideDown();
    console.log('termino');
}

function modalPreview () { 
  var name = $( this ).parent().find('td:first').text();
  $('.modal-title').text( name );
}

$( document ).ready( start );