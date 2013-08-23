function start(){
  
  var side_menu_trigger = $('#side-menu-trigger');

  side_menu_trigger.sidr({
    source: '#side-menu'
  });

  side_menu_trigger.on('mouseenter',openSideMenu);
  $('#sidr').on('mouseleave',closeSideMenu);
}

function openSideMenu(){
  $.sidr('open', 'sidr');
}

function closeSideMenu(){
  $.sidr('close', 'sidr');
}

$(document).ready(start);