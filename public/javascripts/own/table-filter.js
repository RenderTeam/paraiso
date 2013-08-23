function tableFilter(){
  var iteratorRow = $('.nameColumn').filter('.iterator').parent(),
      name = $('.nameColumn').filter('.iterator').data('prepartaker-name').toLowerCase(),
      text = $(this).val().toLowerCase(),
      tableLength = $('.nameColumn').length,
      pattern=new RegExp(text),
      i = 2;

  if(text === ''){
    $('.nameColumn').parent().slideDown();
  }else{
    if(pattern.test(name)){
      iteratorRow.slideDown();  
    }else{
      iteratorRow.slideUp();  
    }

    for (i; i <= tableLength; i++) {
      name = $('.nameColumn').filter('.iterator').parent().next().children(':first-child').data('prepartaker-name').toLowerCase();
      iteratorRow = $('.nameColumn').filter('.iterator').parent().next().children(':first-child').parent();
      //Comparacion
      if(pattern.test(name)){
        iteratorRow.slideDown();  
      }else{
        iteratorRow.slideUp();  
      }
      $('.nameColumn').filter('.iterator').parent().next().children(':first-child').addClass('iterator');
      $('.nameColumn').filter('.iterator:first').removeClass('iterator');
    }

    $('.nameColumn').filter('.iterator').removeClass('iterator');
    $('.nameColumn:first').addClass('iterator');
  }
}

function start(){
  $('#input-table-filter').keyup(tableFilter);
}

$(document).ready(start);