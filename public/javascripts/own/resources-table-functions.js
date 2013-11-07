function start () {
  $('.launch-modal-preview').on( 'click', modalPreview );
}

function modalPreview () { 
  var name = $( this ).parent().find('td:first').text();
  $('.modal-title').text( name );
}

$( document ).ready( start );