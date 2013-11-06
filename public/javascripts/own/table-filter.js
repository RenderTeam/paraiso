function tableFilter () {

  var iteratorRow = $('.iterator'),
    department = iteratorRow.children('.department').text().toLowerCase(),
    inputText = $( this ).val().toLowerCase(),
    i = 1,
    name = iteratorRow.children('.name').text().toLowerCase(),
    position = iteratorRow.children('.position').text().toLowerCase(),
    pattern = new RegExp( inputText ),
    tableLength = $('tr').length - 1;

  if ( inputText === '' ) {
    $('tr').slideDown();
  } else {
    for ( i; i <= tableLength; i++ ) {
      iteratorRow = $('.iterator');
      name = iteratorRow.children('.name').text().toLowerCase();
      department = iteratorRow.children('.department').text().toLowerCase();
      position = iteratorRow.children('.position').text().toLowerCase();

      if ( pattern.test( name ) || pattern.test( department ) ||
           pattern.test( position ) ) {
        iteratorRow.slideDown()
      } else {
        iteratorRow.slideUp()
      }

      iteratorRow.next().addClass('iterator');
      iteratorRow.removeClass('iterator');
    }

    $('tbody').find('tr:first').addClass('iterator');
  }
}

function start () {
  $('#input-table-filter').keyup( tableFilter );
}

$( document ).ready( start );