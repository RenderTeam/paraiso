function start() {
  
  var sidr_inner = $('.sidr-inner');

  sidr_inner.find('li').addClass('glyphicon');
  sidr_inner.find('.sidr-class-glyphicon-home').addClass('glyphicon-home');
  sidr_inner.find('.sidr-class-glyphicon-th').addClass('glyphicon-th');
  sidr_inner.find('.sidr-class-glyphicon-refresh').addClass('glyphicon-refresh');
  sidr_inner.find('.sidr-class-glyphicon-folder-open').addClass('glyphicon-folder-open');
  sidr_inner.find('.sidr-class-glyphicon-wrench').addClass('glyphicon-wrench');
  sidr_inner.find('.sidr-class-glyphicon-edit').addClass('glyphicon-edit');
  sidr_inner.find('.sidr-class-glyphicon-globe').addClass('glyphicon-globe');
  sidr_inner.find('.sidr-class-glyphicon-list-alt').addClass('glyphicon-list-alt');
  sidr_inner.find('.sidr-class-glyphicon-plus').addClass('glyphicon-plus');
}

$( document ).ready( start );