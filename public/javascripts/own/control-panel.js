function start () {
  
  var sidr_inner = $('.sidr-inner');

  sidr_inner.find('li').addClass('glyphicon');
  sidr_inner.find('.sidr-class-glyphicon-home').addClass('glyphicon-home');
  sidr_inner.find('.sidr-class-glyphicon-th').addClass('glyphicon-th');
  sidr_inner.find('.sidr-class-glyphicon-refresh').addClass('glyphicon-refresh');
  sidr_inner.find('.sidr-class-glyphicon-folder-open').addClass('glyphicon-folder-open');
}

$(document).ready(start);