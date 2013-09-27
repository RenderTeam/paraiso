function tableFilter() {
  
  var targetTableName = $( this ).data('target-table'),
      targetTable = $('#' + targetTableName);

  targetTable.find('tbody').find('tr:first').addClass('iterator');

  var i = 0,
      iteratorRow,
      iteratorRowLength,
      inputText = $( this ).val().toLowerCase(),
      arrayTdValues,
      pattern = new RegExp( inputText ),
      tableLength = targetTable.find('tr').length - 1;;

  if ( inputText === '' ){
    targetTable.find('tr').slideDown();
  } else {
    for (i; i <= tableLength; i++) {
      iteratorRow = $('.iterator');
      iteratorRowLength = iteratorRow.find('td').length;
      arrayTdValues = jsArrayFromIteratorRow( iteratorRowLength, iteratorRow );

      if ( compareArrayWithRegex( arrayTdValues, pattern ) ){
        iteratorRow.slideDown();
      } else {
        iteratorRow.slideUp();
      }
      iteratorRow.next().addClass('iterator');
      iteratorRow.removeClass('iterator');
    }
  }
}

function jsArrayFromIteratorRow( arrayLength, iteratorRow ){
  var jsArray = new Array;

  for (i = 0; i < arrayLength; i++) {
    jsArray[i] = iteratorRow.find( 'td:nth-child( ' + (i + 1) + ')' ).text().toLowerCase();
  }

  return jsArray;
}

function compareArrayWithRegex( array, regex ) {

  var arrayLength = array.length,
      flag = false,
      i = 0;

  for ( i ; i < arrayLength ; i++) {
    if ( regex.test( array[i] ) ) {
      flag = true;
      break;
    }
  }

  return flag;
}

function start() {
  $( '#input-table-filter' ).keyup( tableFilter );
}

$(document).ready(start);